import Datetime from "./Datetime";
import Tag from "./Tag";
import type { BlogFrontmatter } from "@content/_schemas";

import resizeImageKitUrl from "@utils/resizeImageKitUrl";
import slugify from "@utils/slugify";

export interface Props {
  href?: string;
  frontmatter: BlogFrontmatter;
  secHeading?: boolean;
}

export default function Card({ href, frontmatter, secHeading = true }: Props) {
  const { title, date_published, description, ogImage, tags } = frontmatter;
  const slug = slugify(frontmatter);

  return (
    <li className="my-6 flex items-center">
      {ogImage ? (
        <a
          className="mr-4 shrink-0 basis-20"
          href={href}
          aria-labelledby={`title-${slug}`}
        >
          <img
            className="h-20 w-20 rounded-lg object-cover drop-shadow-lg"
            src={resizeImageKitUrl(ogImage)}
            // Alt tag would be same as title, specified right below.
            // Empty alt tags are understood by screen readers to be skipped.
            alt=""
          />
        </a>
      ) : (
        <div className="mr-4 h-20 shrink-0 basis-20"></div>
      )}
      <div>
        <a
          href={href}
          className="inline-block text-lg font-medium text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
        >
          {secHeading ? (
            <h2
              id={`title-${slug}`}
              className="text-lg font-medium decoration-dashed hover:underline"
              style={{ viewTransitionName: `title-${slug}` }}
            >
              {title}
            </h2>
          ) : (
            <h3
              id={`title-${slug}`}
              className="text-lg font-medium decoration-dashed hover:underline"
              style={{ viewTransitionName: `title-${slug}` }}
            >
              {title}
            </h3>
          )}
        </a>
        <Datetime datetime={date_published} slug={slug} />
        <p>{description}</p>
        <ul className="tags-container">
          {tags.map(tag => (
            <Tag key={tag} name={tag} />
          ))}
        </ul>
      </div>
    </li>
  );
}
