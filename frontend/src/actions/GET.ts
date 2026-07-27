"use server";

type FetchProps = {
  url: string;
};

export const fetchData = async (props: FetchProps) => {
  try {
    const base = process.env.API_BASE_URL?.replace(/\/$/, "") ?? "";
    const path = props.url.replace(/^\//, "");
    const res = await fetch(
      `${base}/${path}`,
      {
        cache: 'no-store', // This tells fetch to not store the response in cache
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      }
    );
    console.log(res,"Rescheck")
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    const data = await res.json();
    const status: any = res.status;
    return { data, status };
  } catch (error) {
    console.log("error fetching", error);
    throw error; // It's better to rethrow the error so calling code can handle it
  }
};