import Image from "next/image";

export default function Footer() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-8">
      <div className="flex gap-8 items-center justify-center text-lg">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.linkedin.com/in/kunal-mathur-71a737227/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/images/linkedin-svgrepo-com.svg"
            alt="LinkedIn icon"
            width={24}
            height={24}
          />
          LinkedIn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/kunal8597"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/images/github-svgrepo-com.svg"
            alt="Github icon"
            width={24}
            height={24}
            className="filter-dark invert-[-1] dark:invert-[1]" // Adjust filter for dark mode
          />
          GitHub
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="mailto:kunalm8597@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/images/email-svgrepo-com.svg"
            alt="Email icon"
            width={24}
            height={24}
            className="filter-dark invert-[-1] dark:invert-[1]" // Adjust filter for dark mode
          />
          Email
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://medium.com/@kunalm8597"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/images/medium-svgrepo-com (1).svg"
            alt="Medium icon"
            width={24}
            height={24}
            className="filter-dark invert-[-1] dark:invert-[1]" // Adjust filter for dark mode
          />
          Medium
        </a>
      </div>
      
    </div>
  );
}
