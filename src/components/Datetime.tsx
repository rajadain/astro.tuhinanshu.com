export interface Props {
  datetime: string | Date;
  size?: "sm" | "lg";
  dateOnly?: boolean;
  className?: string;
  slug?: string;
}

export default function Datetime({
  datetime,
  size = "sm",
  dateOnly = false,
  className,
  slug,
}: Props) {
  return (
    <div
      className={`flex items-center space-x-1 opacity-80 ${className}`}
      style={{ viewTransitionName: `datetime-${slug}` }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon icon-tabler icons-tabler-outline icon-tabler-calendar-due scale-75 pb-1"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2l0 -12" />
        <path d="M16 3v4" />
        <path d="M8 3v4" />
        <path d="M4 11h16" />
        <path d="M11 16a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
      </svg>
      <span className="sr-only">Posted on:</span>
      <span className={`italic ${size === "sm" ? "text-sm" : "text-base"}`}>
        <FormattedDatetime datetime={datetime} dateOnly={dateOnly} />
      </span>
    </div>
  );
}

const FormattedDatetime = ({
  datetime,
  dateOnly,
}: {
  datetime: string | Date;
  dateOnly: boolean;
}) => {
  const myDatetime = new Date(datetime);

  const date = myDatetime.toLocaleDateString([], {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const time = myDatetime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return dateOnly ? (
    date
  ) : (
    <>
      {date}
      <span aria-hidden="true"> | </span>
      <span className="sr-only">&nbsp;at&nbsp;</span>
      {time}
    </>
  );
};
