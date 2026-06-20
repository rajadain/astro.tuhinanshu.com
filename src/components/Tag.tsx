export interface Props {
  name: string;
  size?: "sm" | "lg";
}

export default function Tag({ name, size = "sm" }: Props) {
  const normalizedTag = name.toLowerCase();

  return (
    <li>
      <a
        href={`/tags/${normalizedTag}`}
        className={`tag-pill ${size === "sm" ? "" : "tag-pill-lg"}`}
      >
        #{normalizedTag}
      </a>
    </li>
  );
}
