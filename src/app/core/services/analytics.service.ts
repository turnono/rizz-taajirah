import { Injectable } from '@angular/core';

declare let gtag: Function;

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  constructor() {
    // Initialize gtag if not available
    if (typeof gtag === 'undefined') {
      (window as any).gtag = function () {
        ((window as any).dataLayer = (window as any).dataLayer || []).push(
          arguments
        );
      };
    }
  }

  // Track page views
  trackPageView(page_title: string, page_location: string) {
    gtag('config', 'G-SP3FWBJNT3', {
      page_title: page_title,
      page_location: page_location,
      content_group1: 'Education',
      content_group2: 'AI Platform',
    });
  }

  // Track user engagement events
  trackEvent(action: string, category: string, label?: string, value?: number) {
    gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      custom_parameter_1: 'user_engagement',
    });
  }

  // Track conversions (email signups, course starts, etc.)
  trackConversion(conversion_type: string, details: any = {}) {
    gtag('event', 'conversion', {
      event_category: 'conversion',
      event_label: conversion_type,
      conversion_type: conversion_type,
      ...details,
    });
  }

  // Track course-related events
  trackCourseEvent(action: string, course_name: string, progress?: number) {
    gtag('event', action, {
      event_category: 'course_interaction',
      event_label: course_name,
      course_name: course_name,
      progress: progress,
      content_group1: 'Education',
      custom_parameter_1: 'course_engagement',
    });
  }

  // Track AI-related interactions (optimized for Google AI search)
  trackAIInteraction(
    ai_feature: string,
    interaction_type: string,
    details: any = {}
  ) {
    gtag('event', 'ai_interaction', {
      event_category: 'ai_features',
      event_label: ai_feature,
      ai_feature: ai_feature,
      interaction_type: interaction_type,
      content_group2: 'AI Platform',
      ...details,
    });
  }

  // Track video creation events (82ndrop)
  trackVideoEvent(action: string, video_details: any = {}) {
    gtag('event', action, {
      event_category: 'video_creation',
      event_label: '82ndrop',
      platform: '82ndrop',
      ai_engine: 'Veo3',
      ...video_details,
    });
  }

  // Track external link clicks
  trackExternalClick(destination: string, link_text: string) {
    gtag('event', 'click', {
      event_category: 'external_link',
      event_label: destination,
      link_text: link_text,
      destination: destination,
    });
  }

  // Track user journey milestones
  trackMilestone(milestone_name: string, user_data: any = {}) {
    gtag('event', 'milestone_reached', {
      event_category: 'user_journey',
      event_label: milestone_name,
      milestone_name: milestone_name,
      ...user_data,
    });
  }

  // Track search-related events (for AI optimization)
  trackSearchBehavior(search_intent: string, user_action: string) {
    gtag('event', 'search_behavior', {
      event_category: 'search_optimization',
      event_label: search_intent,
      search_intent: search_intent,
      user_action: user_action,
      platform: 'web',
      ai_optimized: true,
    });
  }

  // Track performance metrics
  trackPerformance(metric_name: string, value: number, unit: string = 'ms') {
    gtag('event', 'performance_metric', {
      event_category: 'performance',
      event_label: metric_name,
      metric_name: metric_name,
      metric_value: value,
      metric_unit: unit,
    });
  }

  // Track Core Web Vitals and loading performance
  trackWebVitals() {
    // Track page load time
    if (typeof window !== 'undefined' && window.performance) {
      const deviceInfo = this.getDeviceInfo();

      const loadTime =
        window.performance.timing.loadEventEnd -
        window.performance.timing.navigationStart;
      if (loadTime > 0) {
        this.trackPerformance('page_load_time', loadTime, 'ms');

        // Track performance by device type
        gtag('event', 'performance_by_device', {
          event_category: 'performance_correlation',
          event_label: deviceInfo.device_type,
          device_type: deviceInfo.device_type,
          browser: deviceInfo.browser,
          os: deviceInfo.os,
          load_time: loadTime,
          performance_tier:
            loadTime < 2000 ? 'fast' : loadTime < 5000 ? 'medium' : 'slow',
        });
      }

      // Track Time to First Byte (TTFB)
      const ttfb =
        window.performance.timing.responseStart -
        window.performance.timing.navigationStart;
      if (ttfb > 0) {
        this.trackPerformance('time_to_first_byte', ttfb, 'ms');
      }

      // Track DOM Content Loaded
      const domContentLoaded =
        window.performance.timing.domContentLoadedEventEnd -
        window.performance.timing.navigationStart;
      if (domContentLoaded > 0) {
        this.trackPerformance('dom_content_loaded', domContentLoaded, 'ms');
      }
    }
  }

  // Track user interaction performance
  trackInteractionPerformance(interaction_type: string, start_time: number) {
    const duration = performance.now() - start_time;
    gtag('event', 'interaction_performance', {
      event_category: 'performance',
      event_label: interaction_type,
      interaction_type: interaction_type,
      duration: Math.round(duration),
      metric_unit: 'ms',
    });
  }

  // Track resource loading times
  trackResourcePerformance() {
    if (
      typeof window !== 'undefined' &&
      window.performance &&
      window.performance.getEntriesByType
    ) {
      const resources = window.performance.getEntriesByType('resource');

      resources.forEach((resource: any) => {
        if (
          resource.name.includes('firebasestorage') ||
          resource.name.includes('taajirah')
        ) {
          const loadTime = resource.responseEnd - resource.startTime;
          if (loadTime > 0) {
            this.trackPerformance(
              `resource_load_${resource.initiatorType}`,
              Math.round(loadTime),
              'ms'
            );
          }
        }
      });
    }
  }

  // Track JavaScript errors and exceptions
  trackError(
    error: Error,
    context: string = 'unknown',
    additional_data: any = {}
  ) {
    gtag('event', 'exception', {
      description: error.message,
      fatal: false,
      error_context: context,
      error_stack: error.stack?.substring(0, 500), // Truncate stack trace
      user_agent: navigator.userAgent,
      url: window.location.href,
      timestamp: new Date().toISOString(),
      ...additional_data,
    });
  }

  // Track failed network requests
  trackNetworkError(url: string, status: number, error_message: string) {
    gtag('event', 'network_error', {
      event_category: 'errors',
      event_label: url,
      error_url: url,
      status_code: status,
      error_message: error_message,
      timestamp: new Date().toISOString(),
    });
  }

  // Track form validation errors
  trackFormError(form_name: string, field_name: string, error_type: string) {
    gtag('event', 'form_error', {
      event_category: 'form_validation',
      event_label: form_name,
      form_name: form_name,
      field_name: field_name,
      error_type: error_type,
    });
  }

  // Track device and browser performance
  trackDevicePerformance() {
    if (typeof window !== 'undefined' && window.navigator) {
      const deviceInfo = this.getDeviceInfo();

      gtag('event', 'device_performance', {
        event_category: 'device_metrics',
        event_label: deviceInfo.device_type,
        device_type: deviceInfo.device_type,
        browser: deviceInfo.browser,
        os: deviceInfo.os,
        screen_resolution: deviceInfo.screen_resolution,
        viewport_size: deviceInfo.viewport_size,
        memory: deviceInfo.memory,
        cores: deviceInfo.cores,
        connection_type: deviceInfo.connection_type,
        touch_support: deviceInfo.touch_support,
      });
    }
  }

  // Get detailed device information
  private getDeviceInfo() {
    const userAgent = navigator.userAgent;
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent
      );
    const isTablet = /iPad|Android(?!.*Mobile)/i.test(userAgent);

    // Detect browser
    let browser = 'unknown';
    if (userAgent.includes('Chrome')) browser = 'chrome';
    else if (userAgent.includes('Firefox')) browser = 'firefox';
    else if (userAgent.includes('Safari')) browser = 'safari';
    else if (userAgent.includes('Edge')) browser = 'edge';

    // Detect OS
    let os = 'unknown';
    if (userAgent.includes('Windows')) os = 'windows';
    else if (userAgent.includes('Mac')) os = 'macos';
    else if (userAgent.includes('Linux')) os = 'linux';
    else if (userAgent.includes('Android')) os = 'android';
    else if (userAgent.includes('iOS')) os = 'ios';

    // Get connection info
    const connection =
      (navigator as any).connection ||
      (navigator as any).mozConnection ||
      (navigator as any).webkitConnection;

    return {
      device_type: isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop',
      browser: browser,
      os: os,
      screen_resolution: `${screen.width}x${screen.height}`,
      viewport_size: `${window.innerWidth}x${window.innerHeight}`,
      memory: (navigator as any).deviceMemory || 'unknown',
      cores: navigator.hardwareConcurrency || 'unknown',
      connection_type: connection?.effectiveType || 'unknown',
      connection_speed: this.getConnectionSpeed(connection),
      touch_support: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
    };
  }

  // Determine connection speed category
  private getConnectionSpeed(connection: any): string {
    if (!connection) return 'unknown';

    const effectiveType = connection.effectiveType;
    const downlink = connection.downlink; // Mbps

    if (effectiveType === 'slow-2g' || downlink < 0.5) return 'very_slow';
    if (effectiveType === '2g' || downlink < 1.5) return 'slow';
    if (effectiveType === '3g' || downlink < 10) return 'medium';
    if (effectiveType === '4g' || downlink >= 10) return 'fast';

    return 'unknown';
  }

  // Track network performance and adapt content
  trackNetworkPerformance() {
    const connection =
      (navigator as any).connection ||
      (navigator as any).mozConnection ||
      (navigator as any).webkitConnection;

    if (connection) {
      const speed = this.getConnectionSpeed(connection);

      gtag('event', 'network_performance', {
        event_category: 'network',
        event_label: speed,
        connection_type: connection.effectiveType || 'unknown',
        downlink_speed: connection.downlink || 'unknown',
        rtt: connection.rtt || 'unknown',
        save_data: connection.saveData || false,
      });

      // Set user property for content adaptation
      this.setUserProperties({
        network_speed: speed,
        save_data_mode: connection.saveData || false,
      });
    }
  }

  // Track offline/online status
  trackConnectionStatus() {
    const isOnline = navigator.onLine;

    gtag('event', 'connection_status', {
      event_category: 'connectivity',
      event_label: isOnline ? 'online' : 'offline',
      is_online: isOnline,
      timestamp: new Date().toISOString(),
    });

    // Set up connection change listeners
    window.addEventListener('online', () => {
      gtag('event', 'connection_restored', {
        event_category: 'connectivity',
        event_label: 'back_online',
        timestamp: new Date().toISOString(),
      });
    });

    window.addEventListener('offline', () => {
      gtag('event', 'connection_lost', {
        event_category: 'connectivity',
        event_label: 'went_offline',
        timestamp: new Date().toISOString(),
      });
    });
  }

  // Enhanced user properties for AI search optimization
  setUserProperties(properties: any) {
    gtag('config', 'G-SP3FWBJNT3', {
      custom_map: {
        user_type: properties.user_type || 'visitor',
        learning_level: properties.learning_level || 'beginner',
        ai_usage: properties.ai_usage || 'none',
        platform_preference: properties.platform_preference || 'web',
      },
    });
  }

  // Track content engagement for AI search signals
  trackContentEngagement(
    content_type: string,
    engagement_time: number,
    scroll_depth: number
  ) {
    gtag('event', 'content_engagement', {
      event_category: 'content',
      event_label: content_type,
      content_type: content_type,
      engagement_time: engagement_time,
      scroll_depth: scroll_depth,
      content_group1: 'Education',
      ai_relevant: true,
    });
  }
}
