import { simpleBlogCard } from "./lib/interface";
import { client } from "./lib/sanity";

async function getData() {
  const query = `*[_type == 'blog'] | order(_createdAt desc)
{
  title,
    'currentSlug': slug.current,
    smallDescription,
    titleImage
}`;

  const data: simpleBlogCard[] = await client.fetch(query);

  return data;
}

export default async function Home() {
  const data = await getData();

  console.log(data);

  return (
    <div>
      <h1>Heyyyy</h1>
    </div>
  );
}
