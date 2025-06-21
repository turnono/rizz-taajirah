import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  constructor(private meta: Meta, private title: Title) {}

  updateTitle(title: string) {
    this.title.setTitle(title);
  }

  updateMetaTags(config: {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
    type?: string;
    author?: string;
  }) {
    if (config.title) {
      this.updateTitle(config.title);
      this.meta.updateTag({ property: 'og:title', content: config.title });
      this.meta.updateTag({ name: 'twitter:title', content: config.title });
    }

    if (config.description) {
      this.meta.updateTag({ name: 'description', content: config.description });
      this.meta.updateTag({
        property: 'og:description',
        content: config.description,
      });
      this.meta.updateTag({
        name: 'twitter:description',
        content: config.description,
      });
    }

    if (config.keywords) {
      this.meta.updateTag({ name: 'keywords', content: config.keywords });
    }

    if (config.image) {
      this.meta.updateTag({ property: 'og:image', content: config.image });
      this.meta.updateTag({ name: 'twitter:image', content: config.image });
    }

    if (config.url) {
      this.meta.updateTag({ property: 'og:url', content: config.url });
      this.meta.updateTag({ name: 'twitter:url', content: config.url });
      this.meta.updateTag({ rel: 'canonical', href: config.url });
    }

    if (config.type) {
      this.meta.updateTag({ property: 'og:type', content: config.type });
    }

    if (config.author) {
      this.meta.updateTag({ name: 'author', content: config.author });
    }
  }

  // AI-optimized meta tags for Google's AI search
  updateAIOptimizedTags(content: {
    topic: string;
    intent: string;
    expertise_level: string;
    content_type: string;
    ai_features?: string[];
    learning_outcomes?: string[];
  }) {
    // Add AI-specific meta tags
    this.meta.updateTag({ name: 'ai:topic', content: content.topic });
    this.meta.updateTag({ name: 'ai:intent', content: content.intent });
    this.meta.updateTag({
      name: 'ai:expertise_level',
      content: content.expertise_level,
    });
    this.meta.updateTag({
      name: 'ai:content_type',
      content: content.content_type,
    });

    if (content.ai_features) {
      this.meta.updateTag({
        name: 'ai:features',
        content: content.ai_features.join(', '),
      });
    }

    if (content.learning_outcomes) {
      this.meta.updateTag({
        name: 'ai:learning_outcomes',
        content: content.learning_outcomes.join(', '),
      });
    }

    // Add educational schema
    this.meta.updateTag({
      name: 'educational:level',
      content: content.expertise_level,
    });
    this.meta.updateTag({
      name: 'educational:subject',
      content: content.topic,
    });
  }

  // Course-specific SEO optimization
  updateCoursePageSEO(course: {
    name: string;
    description: string;
    level: string;
    topics: string[];
    ai_features: string[];
    free: boolean;
  }) {
    const title = `${course.name} - Free ${course.level} Course | TAAJIRAH`;
    const description = `${
      course.description
    } Features: ${course.ai_features.join(', ')}. ${
      course.free ? 'Completely free' : ''
    } online course.`;

    this.updateMetaTags({
      title,
      description,
      keywords: `${course.topics.join(
        ', '
      )}, AI learning, interactive course, ${course.level} level`,
      type: 'article',
      author: 'Abdullah Abrahams',
    });

    this.updateAIOptimizedTags({
      topic: course.name,
      intent: 'learning',
      expertise_level: course.level,
      content_type: 'interactive_course',
      ai_features: course.ai_features,
      learning_outcomes: course.topics,
    });

    // Add course-specific structured data
    this.addCourseStructuredData(course);
  }

  // Video platform SEO optimization
  updateVideoPageSEO(platform: {
    name: string;
    description: string;
    ai_engine: string;
    features: string[];
    video_format: string;
  }) {
    const title = `${platform.name} - AI Video Creation Platform | TAAJIRAH`;
    const description = `${platform.description} Powered by ${platform.ai_engine}. Create ${platform.video_format} videos with AI.`;

    this.updateMetaTags({
      title,
      description,
      keywords: `AI video creation, ${platform.ai_engine}, ${
        platform.video_format
      }, video generation, ${platform.features.join(', ')}`,
      type: 'website',
      author: 'Abdullah Abrahams',
    });

    this.updateAIOptimizedTags({
      topic: 'AI Video Creation',
      intent: 'creation',
      expertise_level: 'all_levels',
      content_type: 'ai_platform',
      ai_features: [platform.ai_engine, ...platform.features],
    });
  }

  // Add structured data for courses
  private addCourseStructuredData(course: any) {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: course.name,
      description: course.description,
      provider: {
        '@type': 'EducationalOrganization',
        name: 'TAAJIRAH',
        url: 'https://taajirah.web.app',
      },
      educationalLevel: course.level,
      teaches: course.topics,
      isAccessibleForFree: course.free,
      inLanguage: 'en',
      courseMode: 'online',
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: 'online',
        instructor: {
          '@type': 'Person',
          name: 'Abdullah Abrahams',
        },
      },
    };

    this.addStructuredData('course-data', structuredData);
  }

  // Generic structured data method
  addStructuredData(id: string, data: any) {
    let script = document.getElementById(id);
    if (script) {
      script.remove();
    }

    const newScript = document.createElement('script') as HTMLScriptElement;
    newScript.id = id;
    newScript.type = 'application/ld+json';
    newScript.text = JSON.stringify(data);
    document.head.appendChild(newScript);
  }

  // Remove structured data
  removeStructuredData(id: string) {
    const script = document.getElementById(id);
    if (script) {
      script.remove();
    }
  }
}
