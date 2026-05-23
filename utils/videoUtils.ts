/**
 * Normalizes various video URL formats (YouTube, Vimeo, Iframes, Direct Files)
 * into a format suitable for <iframe> src or <video> src.
 * Handles protocol typos and extracts src from iframe strings.
 */
export const getNormalizedVideoUrl = (
  videoUrl: string | null | undefined, 
  options: { autoplay?: boolean } = {}
): string | null => {
  if (!videoUrl) return null

  let cleaned = String(videoUrl)
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'")
    .replace(/\\\\"/g, '"')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .trim()

  // 1. Fix protocol typos like "htpps" or "htps"
  cleaned = cleaned.replace(/^(htpps|htps|htp):/i, (match) => {
    if (match.toLowerCase().startsWith('htpp') || match.toLowerCase().startsWith('htp')) return 'https:';
    return 'https:';
  });

  // 2. If it's an iframe string, extract the src
  if (cleaned.includes('<iframe')) {
    const srcMatch = cleaned.match(/src=["']([^"']+)["']/i)
    if (srcMatch && srcMatch[1]) {
      cleaned = srcMatch[1]
    }
  }

  // 3. Ensure it has a protocol if it starts with //
  if (cleaned.startsWith('//')) {
    cleaned = `https:${cleaned}`
  }

  // 4. Handle YouTube
  if (cleaned.includes('youtube.com') || cleaned.includes('youtu.be')) {
    let videoId = ''
    if (cleaned.includes('watch?v=')) {
      videoId = cleaned.split('watch?v=')[1].split('&')[0]
    } else if (cleaned.includes('embed/')) {
      videoId = cleaned.split('embed/')[1].split('?')[0]
    } else if (cleaned.includes('youtu.be/')) {
      videoId = cleaned.split('youtu.be/')[1].split('?')[0]
    } else if (cleaned.includes('v/')) {
        videoId = cleaned.split('v/')[1].split(/[?&]/)[0]
    }

    if (videoId && videoId.length >= 11) {
      const params = new URLSearchParams({
        rel: '0',
        modestbranding: '1',
        enablejsapi: '1'
      });
      if (options.autoplay) {
        params.append('autoplay', '1');
        params.append('mute', '1'); // Autoplay often requires mute
      }
      return `https://www.youtube.com/embed/${videoId}?${params.toString()}`
    }
    
    // If it's just youtube.com without a video ID, it's invalid for an embed
    return null
  }

  // 5. Handle Vimeo
  if (cleaned.includes('vimeo.com')) {
    const vimeoMatch = cleaned.match(/vimeo\.com\/(?:video\/)?([0-9]+)/)
    if (vimeoMatch && vimeoMatch[1]) {
        const params = new URLSearchParams();
        if (options.autoplay) {
            params.append('autoplay', '1');
            params.append('muted', '1');
        }
        const query = params.toString();
      return `https://player.vimeo.com/video/${vimeoMatch[1]}${query ? '?' + query : ''}`
    }
    return null
  }

  // 6. Basic URL validation
  try {
    if (!cleaned.startsWith('http') && !cleaned.startsWith('/') && !cleaned.startsWith('./')) {
        if (cleaned.includes('.')) {
            cleaned = `https://${cleaned}`
        } else {
            return null
        }
    }
    new URL(cleaned)
  } catch (e) {
    const isVideoFile = /\.(mp4|webm|ogg)$/i.test(cleaned)
    if (!isVideoFile) return null
  }

  return cleaned
}

/**
 * Checks if a URL points to a direct video file.
 */
export const isVideoFile = (url: string | null | undefined): boolean => {
    if (!url) return false;
    return /\.(mp4|webm|ogg)$/i.test(url);
}
