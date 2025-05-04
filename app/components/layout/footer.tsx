import React from "react";
import { Twitter } from "lucide-react";
import { MessageCircle } from "lucide-react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="mt-16 border-t border-border/40">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © 2025 Latest Block. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://twitter.com/latestblock"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-primary transition-colors duration-300 flex items-center gap-2"
          >
            <Twitter className="h-4 w-4" />
            <span className="text-sm">Follow us on Twitter</span>
          </a>
          <a
            href="https://t.me/latestblock"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-primary transition-colors duration-300 flex items-center gap-2"
          >
            <MessageCircle className="h-4 w-4" />
            <span className="text-sm">Join our Telegram</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
