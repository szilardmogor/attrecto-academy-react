import React from "react";

interface ProfileImageViewProps {
  imageUrl: string;
  className?: string;
}

export const ProfileImageView = ({ imageUrl, className }: { imageUrl: string; className?: string }) => {
    return (
        <img src={imageUrl} className={className} />
    );
}

export default ProfileImageView;