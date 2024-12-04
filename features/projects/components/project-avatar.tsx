import React from "react";
import Image from "next/image";

interface ProjectAvatarProps {
  name: string;
  imageUrl?: string;
  size?: "sm" | "md" | "lg";
}

export function ProjectAvatar({
  name,
  imageUrl,
  size = "md",
}: ProjectAvatarProps) {
  const firstLetter = name.charAt(0).toUpperCase();

  const sizeClasses = {
    sm: "w-6 h-6 text-xs",
    md: "w-8 h-8 text-sm",
    lg: "w-16 h-16 text-base",
  };

  const avatarSize = sizeClasses[size];

  return (
    <div className="flex items-center space-x-3">
      <div
        className={`${avatarSize} rounded-md overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold flex-shrink-0`}
        aria-hidden="true"
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt=""
            width={64}
            height={64}
            className="w-full h-full object-cover"
          />
        ) : (
          firstLetter
        )}
      </div>
    </div>
  );
}
