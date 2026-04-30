import type { MetaFunction } from "@remix-run/node";
import { useState, type FormEventHandler } from "react";

export const meta: MetaFunction = () => {
  return [{ title: "mhespenh.com | Contact" }];
};

export default function Contact() {
  const [result, setResult] = useState("");

  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    formData.append("access_key", "38665066-9841-434e-aa55-a4a13feedf61");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setResult(data.success ? "Success!" : "Error");
  };

  return (
    <>
      <div className="flex flex-col gap-16">
        <header className="flex flex-col items-start max-w-2xl text-center md:text-left">
          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-6 tracking-tighter">
            Let's connect.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Whether you have a project in mind, a question about my work, or
            just want to say hi, my inbox is always open.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 flex flex-col gap-12">
            <div className="flex flex-col gap-8 bg-card/30 backdrop-blur-3xl border border-border rounded-2xl p-8 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              <div>
                <h3 className="text-xs uppercase font-bold tracking-widest text-muted-foreground mb-2">
                  Location
                </h3>
                <p className="text-foreground flex items-center gap-2">
                  <span className="material-symbols-outlined text-muted-foreground text-[20px]">
                    location_on
                  </span>
                  St Petersburg, FL / Remote
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-xs uppercase font-bold tracking-widest text-muted-foreground">
                Digital Presence
              </h3>
              <div className="flex flex-wrap gap-4">
                {[
                  { name: "GitHub", href: "https://github.com/mhespenh" },
                  {
                    name: "LinkedIn",
                    href: "https://linkedin.com/in/mhespenh",
                  },
                  {
                    name: "Bluesky",
                    href: "https://bsky.app/profile/mhespenh.com",
                  },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-full bg-background border border-border hover:border-primary/50 text-foreground text-sm font-semibold flex items-center gap-2 transition-all hover:shadow-lg group"
                  >
                    {social.name}
                    <span className="material-symbols-outlined text-[16px] text-muted-foreground group-hover:text-primary transition-colors">
                      north_east
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-card/50 backdrop-blur-2xl border border-border shadow-2xl rounded-2xl p-8 md:p-12">
              <form className="flex flex-col gap-6" onSubmit={onSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label
                      className="text-xs font-bold tracking-widest text-muted-foreground"
                      htmlFor="name"
                    >
                      Name
                    </label>
                    <input
                      className="bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary rounded-lg p-4 text-foreground text-sm transition-colors placeholder:text-muted-foreground/50 outline-none w-full"
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      type="text"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      className="text-xs font-bold tracking-widest text-muted-foreground"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      className="bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary rounded-lg p-4 text-foreground text-sm transition-colors placeholder:text-muted-foreground/50 outline-none w-full"
                      id="email"
                      name="email"
                      placeholder="john@example.com"
                      type="email"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    className="text-xs font-bold tracking-widest text-muted-foreground"
                    htmlFor="subject"
                  >
                    Subject (Optional)
                  </label>
                  <input
                    className="bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary rounded-lg p-4 text-foreground text-sm transition-colors placeholder:text-muted-foreground/50 outline-none w-full"
                    id="subject"
                    name="subject"
                    placeholder="Project Inquiry"
                    type="text"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    className="text-xs font-bold tracking-widest text-muted-foreground"
                    htmlFor="message"
                  >
                    Message
                  </label>
                  <textarea
                    className="bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary rounded-lg p-4 text-foreground text-sm transition-colors placeholder:text-muted-foreground/50 outline-none w-full resize-none"
                    id="message"
                    name="message"
                    placeholder="Tell me about your project..."
                    rows={6}
                    required
                  ></textarea>
                </div>
                <div className="mt-4">
                  <button
                    className="w-full bg-gradient-to-r from-primary to-purple-600 dark:to-[#344768] text-primary-foreground font-bold text-sm rounded-lg px-8 py-4 hover:opacity-90 hover:shadow-xl transition-all flex justify-center items-center gap-2 group"
                    type="submit"
                  >
                    Send Message
                    <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
                      send
                    </span>
                  </button>
                </div>
                <p>{result}</p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
