import { Card, CardContent } from "@/components/ui/card";
import { simpleBlogCard } from "./lib/interface";
import { client, urlFor } from "./lib/sanity";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const revalidate = 30; //refresh after 30 sec for new data to be pushed from sanity

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
    <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-5">
      {data.map((post, idx) => (
        <Card key={idx}>
          <Image
            src={urlFor(post.titleImage).url()}
            alt={""}
            width={1000}
            height={1000}
            className="rounded-t-lg h-[200px] object-cover"
          />

          <CardContent>
            <h3 className="pt-3 text-lg line-clamp-2">{post.title}</h3>
            <p className="line-clamp-3 text-sm mt-2 dark:text-gray-300 text-gray-700">
              {post.smallDescription}
            </p>
            <Button asChild className="w-full mt-7 cursor-pointer">
              <Link href={`/blog/${post.currentSlug}`}>Read More</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
