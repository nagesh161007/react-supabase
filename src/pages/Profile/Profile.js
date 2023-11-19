import { useEffect, useState } from "react";
import supabase from "../../utils/supabase";

export default function Profile() {
  const [data, setData] = useState();
  useEffect(() => {
    async function fetchUser() {
      const {
        data: { user }
      } = await supabase.auth.getUser();

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      setData(data);
    }

    fetchUser();
  });
  return <div>{JSON.stringify(data)}</div>;
}
