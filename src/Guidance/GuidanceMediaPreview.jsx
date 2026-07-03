import React from 'react'
import noImg from '../dist/webImages/nocar.jpg'

const isVideoUrl = (value) => /\.(mp4|webm|ogg)(\?.*)?$/i.test(value || '')

const GuidanceMediaPreview = ({ src, alt, className = 'w-full h-full rounded-2xl object-cover border border-[#CFD5E2] bg-white' }) => {
  if (src && isVideoUrl(src)) {
    return (
      <video
        className={className}
        src={src}
        muted
        playsInline
        controls={false}
        autoPlay={false}
        preload="metadata"
      />
    )
  }

  return (
    <img
      src={src || noImg}
      className={className}
      alt={alt || 'Guidance'}
      onError={(e) => {
        e.currentTarget.onerror = null
        e.currentTarget.src = noImg
      }}
    />
  )
}

export default GuidanceMediaPreview
