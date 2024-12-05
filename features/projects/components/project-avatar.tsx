import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ProjectAvatarProps {
  name: string;
  imageUrl?: string;
  projectId?: string;
  size?: "sm" | "md" | "lg";
}

export function ProjectAvatar({
  name,
  imageUrl,
  projectId,
  size = "md",
}: ProjectAvatarProps) {
  const firstLetter = name ? name.charAt(0).toUpperCase() : "";

  const sizeClasses = {
    sm: "w-6 h-6 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-16 h-16 text-base",
  };

  const avatarSize = sizeClasses[size];

  return (
    <Link
      href={`/projects/${projectId}`}
      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition"
      title={`View project: ${name}`}
    >
      <div
        className={`${avatarSize} rounded-md overflow-hidden bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-white font-semibold`}
        aria-hidden="true"
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            width={64}
            height={64}
            className="w-full h-full object-cover"
          />
        ) : (
          firstLetter
        )}
      </div>

      <div className="flex flex-col">
        <span className="font-medium text-gray-800 text-sm ">{name}</span>
      </div>
    </Link>
  );
}
