"use client";

import { Globe } from "lucide-react";
// lucide dropped its brand icons, so the site carries its own GitHub mark.
import { GithubIcon } from "@/components/icons/github-icon";
import {
  LoginBlock,
  SignUpBlock,
  ForgotPasswordBlock,
  ResetPasswordBlock,
  EmailVerificationBlock,
  TwoFactorAuthBlock,
} from "@sakaniui/react/blocks";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { BlockSource } from "@/components/docs/block-source";
import { Pager } from "@/components/docs/pager";

const LOGIN = `import { LoginBlock } from '@sakaniui/react/blocks';

<LoginBlock
  socialProviders={[
    { icon: <GithubIcon size={16} />, label: 'GitHub', onClick: signInWithGitHub },
  ]}
  onSubmit={(email, password, rememberMe) => signIn({ email, password, rememberMe })}
  onForgotPassword={() => router.push('/forgot-password')}
  onSignUp={() => router.push('/sign-up')}
/>`;

const STATES = `// initialStatus drives the whole block's appearance, including
// the skeleton it shows before your auth provider has loaded.
<LoginBlock initialStatus="validation-error" />
<LoginBlock initialStatus="server-error" />
<LoginBlock initialStatus="loading" />
<LoginBlock initialStatus="skeleton" />`;

const RECOVERY = `<ForgotPasswordBlock onSubmit={sendResetLink} />
<ResetPasswordBlock onSubmit={setNewPassword} />
<EmailVerificationBlock onResend={resendCode} />
<TwoFactorAuthBlock onVerify={verifyCode} />`;

const PROVIDERS = [
  { icon: <GithubIcon size={16} />, label: "GitHub" },
  { icon: <Globe size={16} />, label: "Google" },
];

export default function AuthenticationPage() {
  return (
    <article>
      <PageHeader
        title="Authentication"
        description="The six screens of an auth flow: sign in, sign up, password recovery, email verification, and 2FA."
      />

      <div className="doc-prose mb-8">
        <p>
          These blocks hold their own form state and validation so they can be
          dropped into a route and demoed immediately, but they never talk to an
          auth provider. Everything real happens in the callbacks you pass:{" "}
          <code>onSubmit</code>, <code>onResend</code>, <code>onVerify</code>.
        </p>
      </div>

      <div className="space-y-10">
        <ComponentPreview code={LOGIN} fullBleed>
          <LoginBlock socialProviders={PROVIDERS} />
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Statuses</h2>
          <p className="mb-3 text-sm text-ink-muted">
            <code>initialStatus</code> covers the states an auth screen actually
            passes through, including <code>skeleton</code> for the gap before
            your provider has initialised. It&apos;s the <em>initial</em> value
            — the block manages the status itself afterwards, so drive real
            failures by re-mounting with a new status or by owning the form
            yourself.
          </p>
          <ComponentPreview code={STATES} fullBleed>
            <div className="flex w-full flex-col gap-6">
              <LoginBlock initialStatus="validation-error" />
              <LoginBlock initialStatus="skeleton" />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Sign up</h2>
          <ComponentPreview code={`<SignUpBlock onSubmit={createAccount} onSignIn={goToSignIn} />`} fullBleed>
            <SignUpBlock socialProviders={PROVIDERS} />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Recovery and verification</h2>
          <ComponentPreview code={RECOVERY} fullBleed>
            <div className="flex w-full flex-col gap-6">
              <ForgotPasswordBlock />
              <ResetPasswordBlock />
              <EmailVerificationBlock />
              <TwoFactorAuthBlock />
            </div>
          </ComponentPreview>
        </section>

        <BlockSource
          blocks={[
            "LoginBlock",
            "SignUpBlock",
            "ForgotPasswordBlock",
            "ResetPasswordBlock",
            "EmailVerificationBlock",
            "TwoFactorAuthBlock",
          ]}
        />
      </div>

      <Pager current="/docs/blocks/authentication" />
    </article>
  );
}
