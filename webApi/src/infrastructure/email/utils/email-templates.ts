import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import Handlebars from 'handlebars';

import { EmailTemplateName } from '../types/templates.type';

const cache = new Map<string, Handlebars.TemplateDelegate>();

export const renderEmailTemplate = async (
    templateDir: string,
    name: EmailTemplateName,
    context: Record<string, any>,
): Promise<string> => {
    const cacheKey = `${templateDir}:${name}`;
    const cached = cache.get(cacheKey);
    if (cached) return cached(context);

    const filePath = path.join(templateDir, `${name}.hbs`);
    const source = await fs.readFile(filePath, 'utf8');

    const compiled = Handlebars.compile(source, { strict: true });
    cache.set(cacheKey, compiled);

    return compiled(context);
};
