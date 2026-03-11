export const en = {
    auth: {
        validation: {
            firstName: { required: 'First name is required' },
            lastName: { required: 'Last name is required' },
            email: {
                required: 'Email is required',
                invalid: 'Invalid email',
            },
            password: {
                required: 'Password is required',
                minLength: 'Password must be at least {{min}} characters',
                maxLength: 'Password must be at most {{max}} characters',
                lowercase: 'Password must contain a lowercase letter',
                uppercase: 'Password must contain an uppercase letter',
                number: 'Password must contain a number',
                specialChar: 'Password must contain a special character',
                confirmMatch: 'Passwords do not match',
            },
        },
        signup: {
            state: {
                default: {
                    title: 'Create your account',
                    description: 'Sign up to start using Doshka.',
                },
                success: {
                    title: 'Check your email',
                    description:
                        "We've sent a confirmation link to your email address. Please verify your account to continue.",
                    sentTo: 'Confirmation sent to: {{email}}',
                },
            },
            redirect: {
                default: {
                    question: 'Already have an account?',
                    linkText: 'Log in',
                },
                success: {
                    question: 'Already confirmed your email?',
                    linkText: 'Back to login',
                },
            },
            toast: {
                success: {
                    title: 'Account created',
                },
                error: {
                    title: 'Signup failed',
                },
            },
            form: {
                button: {
                    submit: 'Create account',
                },
                input: {
                    firstName: {
                        label: 'First name',
                        placeholder: 'Your name',
                    },
                    lastName: {
                        label: 'Last name',
                        placeholder: 'Your last name',
                    },
                    email: {
                        label: 'Email',
                        placeholder: 'test@test.com',
                    },
                    password: {
                        label: 'Password',
                        placeholder: '••••••••',
                    },
                    confirmPassword: {
                        label: 'Confirm password',
                        placeholder: '••••••••',
                    },
                },
            },
        },

        resendConfirmationEmail: {
            button: {
                idle: 'Resend confirmation email',
                cooldown: 'Resend available in {{seconds}}s',
            },
            toast: {
                success: {
                    title: 'Confiramtion email sent again',
                },
                error: { title: 'Failed to resend email' },
            },
        },

        resetPassword: {
            state: {
                default: {
                    title: 'Reset your password',
                    description: 'Create a new password for your account.',
                },
            },
            redirect: {
                default: {
                    question: 'Remembered your password?',
                    linkText: 'Back to login',
                },
            },
            toast: {
                success: {
                    title: 'Password updated',
                },
                error: {
                    title: 'Reset failed',
                },
            },
            form: {
                button: {
                    submit: 'Reset password',
                },
                input: {
                    password: {
                        label: 'New password',
                        placeholder: '••••••••',
                    },
                    confirmPassword: {
                        label: 'Confirm password',
                        placeholder: '••••••••',
                    },
                },
            },
        },

        logout: {
            button: {
                idle: 'Log out',
            },
            toast: {
                success: {
                    title: 'Signed out',
                    message: "You've been logged out.",
                },
                error: { title: 'Logout failed' },
            },
        },

        login: {
            state: {
                default: {
                    title: 'Welcome back',
                    description: 'Sign in to continue to Doshka.',
                },
            },
            redirect: {
                forgotPassword: {
                    question: 'Trouble signing in?',
                    linkText: 'Forgot password?',
                },
                signup: {
                    question: "Don't have an account?",
                    linkText: 'Sign up',
                },
            },
            toast: {
                success: {
                    title: 'Signed in successfully',
                    message: 'Welcome back to Doshka.',
                },
                error: {
                    title: 'Login failed',
                },
            },
            form: {
                button: {
                    submit: 'Log in to your account',
                },
                input: {
                    email: {
                        label: 'Email',
                        placeholder: 'test@test.com',
                    },
                    password: {
                        label: 'Password',
                        placeholder: '••••••••',
                    },
                },
            },
        },

        forgotPassword: {
            state: {
                default: {
                    title: 'Forgot your password?',
                    description:
                        "Enter your email and we'll send you a link to reset your password.",
                },
                success: {
                    title: 'Check your email',
                    description:
                        "If an account exists for this email, we've sent a reset link.",
                    sentTo: 'Confirmation sent to: {{email}}',
                },
            },
            redirect: {
                default: {
                    question: 'Remember your password?',
                    linkText: 'Back to login',
                },
                success: {
                    question: 'Already reset your password?',
                    linkText: 'Back to login',
                },
            },
            toast: {
                success: {
                    title: 'Check your email',
                },
                error: {
                    title: 'Request failed',
                },
            },
            form: {
                button: {
                    submit: 'Send reset link',
                },
                input: {
                    email: {
                        label: 'Email',
                        placeholder: 'test@test.com',
                    },
                },
            },
        },

        confirmEmail: {
            state: {
                default: {
                    title: 'Confirmation failed',
                    description:
                        'Something went wrong. Please try again later.',
                },
                pending: {
                    title: 'Confirming your email...',
                    description: 'Please wait a moment.',
                },
                success: {
                    title: 'Email confirmed!',
                    description:
                        'Your email has been verified. You can now sign in.',
                },
                expired: {
                    title: 'Link expired',
                    description:
                        'This link has expired. Request a new verification email from Login.',
                },
                invalid: {
                    title: 'Invalid link',
                    description:
                        'This link is not valid. Open the link from your email again.',
                },
                alreadyUsed: {
                    title: 'Token already used',
                    description:
                        'This link already used. Open the last link from your email again.',
                },
            },
            redirect: {
                error: {
                    linkText: 'Create a new account',
                },
                success: {
                    linkText: 'Back to login',
                },
            },
        },
    },

    app: {
        nav: {
            inbox: 'Inbox',
            myIssues: 'My issues',
            workspace: 'Workspace',
            issues: 'Issues',
            projects: 'Projects',
            wiki: 'Wiki',
        },
        workspace: {
            menu: {
                settings: 'Settings',
                switchWorkspace: 'Switch workspace',
                logout: 'Log out',
            },
        },
    },

    settings: {
        nav: {
            backToApp: 'Back to app',
            preferences: 'Preferences',
            profile: 'Profile',
            security: 'Security & access',
        },
    },
} as const;
