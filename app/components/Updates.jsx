import Image from "next/image";
import NextImage from "../../public/next.png";

export default function Updates() {
  return (
    <section>
      <h2>StudieLedd Updates</h2>
      <div className="card">
        <h3>Development moving to NextJS</h3>
        <Image
          className="mt-2"
          src={NextImage}
          alt="Next.js logo"
          width={200}
        />
        <p>
          The StudieLedd team are pleased to announce that development of the
          app is moving away from vanilla JavaScript and to the Next.js
          framework. Next.js is a flexible React framework that will give us the
          building blocks to deliver a fast and responsive server side rendered
          application...
        </p>
      </div>
      <div className="card">
        <h3>New website live!</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, at
          quam. Dolores omnis possimus quam soluta rerum illo laborum ullam
          pariatur molestiae, modi beatae corrupti, assumenda distinctio
          adipisci, cupiditate minima eum vitae? Similique dicta est facilis
          debitis, autem temporibus quo repellat illum unde id iste veritatis
          eveniet, aspernatur enim quas.
        </p>
      </div>
    </section>
  );
}
