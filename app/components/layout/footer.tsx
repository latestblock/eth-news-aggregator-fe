import React from "react";
import { Twitter } from "lucide-react";
import { MessageCircle } from "lucide-react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="mt-16 pt-6 pb-8 px-4 border-t border-border/40">
      <div className="flex flex-col items-center gap-6 sm:gap-4 max-w-7xl mx-auto">
        <p className="text-center text-xs sm:text-sm text-muted-foreground">
          © 2025 Latest Block. All rights reserved.
        </p>
        <div className="flex flex-row items-center gap-5 sm:gap-4">
          <a
            href="https://twitter.com/latestblock"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 dark:text-gray-200 hover:text-primary transition-colors duration-300 flex items-center gap-2"
          >
            <Twitter className="h-4 w-4" />
            <span className="text-xs sm:text-sm">Twitter</span>
          </a>
          <a
            href="https://t.me/latestblock"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 dark:text-gray-200 hover:text-primary transition-colors duration-300 flex items-center gap-2"
          >
            <MessageCircle className="h-4 w-4" />
            <span className="text-xs sm:text-sm">Telegram</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
