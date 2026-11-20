import React, { useState } from 'react';

export interface LoginFormProps {
  onSubmit?: (credentials: { publicKey: string; signature: string; nonce: string }) => Promise<void> | void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [publicKey, setPublicKey] = useState('');
  const [signature, setSignature] = useState('');
  const [nonce, setNonce] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!publicKey.trim() || !signature.trim() || !nonce.trim()) {
      setError('All fields are required.');
      return;
    }

    if (!/^G[A-Z0-9]{55}$/.test(publicKey)) {
      setError('Invalid Stellar public key format.');
      return;
    }

    setSubmitting(true);
    try {
      if (onSubmit) {
        await onSubmit({ publicKey, signature, nonce });
      }
    } catch (err) {
      const message =
        err instanceof Error && err.message
          ? err.message
          : 'Login failed. Please check your credentials and try again.';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {error && (
        <div role="alert" className="login-error" style={{ color: 'red', marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      <div>
        <label htmlFor="publicKey">Stellar Public Key</label>
        <input
          id="publicKey"
          type="text"
          value={publicKey}
          onChange={(e) => setPublicKey(e.target.value)}
          disabled={submitting}
        />
      </div>

      <div>
        <label htmlFor="signature">Signature</label>
        <input
          id="signature"
          type="text"
          value={signature}
          onChange={(e) => setSignature(e.target.value)}
          disabled={submitting}
        />
      </div>

      <div>
        <label htmlFor="nonce">Nonce</label>
        <input
          id="nonce"
          type="text"
          value={nonce}
          onChange={(e) => setNonce(e.target.value)}
          disabled={submitting}
        />
      </div>

      <button type="submit" disabled={submitting}>
        {submitting ? 'Logging in...' : 'Log in'}
      </button>
    </form>
  );
};

export default LoginForm;
