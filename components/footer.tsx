import Image from "next/image";

export default function Footer() {
  return (
    <div className="row-start-3 flex gap-6 items-center justify-center">
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
          width={16}
          height={16}
        
        />
        linkedin
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
          width={16}
          height={16}
          className="filter-dark invert-[-1] dark:invert-[1]" // Adjust filter for dark mode
        />
        github
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
          width={17}
          height={19}
          className="filter-dark invert-[-1] dark:invert-[1]" // Adjust filter for dark mode
        />
        email
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
          width={17}
          height={19}
          className="filter-dark invert-[-1] dark:invert-[1]" // Adjust filter for dark mode
        />
        medium
      </a>
      
     
    </div>

   
    
  );
}
