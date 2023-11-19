import { useState, useEffect } from "react";
import supabase from "../utils/supabase"; // Update the import path

function useAuth() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      const { data } = await supabase.auth.getSession();
      setLoading(false);
      setSession(data.session);

      const {
        data: { subscription }
      } = supabase.auth.onAuthStateChange((_event, updatedSession) => {
        setSession(updatedSession);
      });

      return () => {
        if (subscription) {
          subscription.unsubscribe();
        }
      };
    }

    checkAuth();
  }, []);
  return {
    session,
    loading,
    isLoggedIn: !!session
  };
}

export default useAuth;
