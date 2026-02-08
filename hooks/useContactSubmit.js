import { useState, useCallback } from "react";

/**
 * Submits contact form data to the API and returns loading/error state.
 * @returns {{ submit: (values: { email: string, name: string, message: string }) => Promise<boolean>, loading: boolean, error: string|null }}
 */
export function useContactSubmit() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submit = useCallback(async (values) => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          name: values.name,
          message: values.message,
          website: values.website ?? "",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        return false;
      }
      return true;
    } catch (err) {
      setError(err.message || "Network error.");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { submit, loading, error };
}
