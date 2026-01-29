/**
 * Mock AI Analysis Data
 * Simulates AI resume analysis results
 */

export const generateMockAnalysis = (jobRole) => {
  const analysisDatabase = {
    'Frontend Developer': {
      score: 85,
      atsPercentage: 92,
      keywordMatchPercentage: 64,
      atsStatus: 'High',
      keywordStatus: 'Average',
      strengths: [
        {
          id: 1,
          title: 'Quantifiable Achievements',
          description: 'Excellent use of metrics like "increased revenue by 35%", which hiring managers value.',
        },
        {
          id: 2,
          title: 'Contact Information',
          description: 'All contact details are clearly displayed and professionally formatted.',
        },
        {
          id: 3,
          title: 'Clean Formatting',
          description: 'Standard font sizes and clear section headings make it easy to scan.',
        },
      ],
      improvements: [
        {
          id: 1,
          title: 'Vague Action Verbs',
          description: 'Action "Responsible for" is weak. Use "Spearheaded" or "Orchestrated" instead.',
        },
        {
          id: 2,
          title: 'Missing LinkedIn Profile',
          description: '40% of recruiters check LinkedIn. Adding a link increases visibility.',
        },
        {
          id: 3,
          title: 'Weak Summary Statement',
          description: 'Your professional summary is generic. Tailor it to your target role.',
        },
      ],
      missingKeywords: [
        'Project Management',
        'Agile Methodology',
        'Stakeholder Management',
        'Gantt Chart',
        'Cross-functional Leadership',
        'Process Improvement',
      ],
      tips: [
        {
          id: 1,
          title: 'Revise your Summary Section',
          description:
            'Your summary is currently passive. Rewrite it to highlight 2-3 major career wins and mention your core expertise within the first 10 words.',
        },
        {
          id: 2,
          title: 'Upgrade your Bullet Points',
          description:
            'Ensure every bullet point follows the STAR method (Situation, Task, Action, Result). Aim for at least one number or percentage per role.',
        },
        {
          id: 3,
          title: 'Standardize Dates',
          description:
            'You have used "Aug 2021" in some places and "08/21" in others. Use a consistent format like "Month Year" throughout for better ATS parsing.',
        },
        {
          id: 4,
          title: 'Add More Technical Keywords',
          description:
            'Include relevant software, tools, and frameworks for your target role. Reference the job posting and add matching terms naturally.',
        },
      ],
    },
    'Data Analyst': {
      score: 78,
      atsPercentage: 88,
      keywordMatchPercentage: 71,
      atsStatus: 'High',
      keywordStatus: 'Average',
      strengths: [
        {
          id: 1,
          title: 'Strong Technical Skills',
          description: 'Good listing of tools like Python, SQL, and Tableau which are crucial for data roles.',
        },
        {
          id: 2,
          title: 'Relevant Experience',
          description: 'Clear progression in data-related roles showing career growth.',
        },
        {
          id: 3,
          title: 'Results-Oriented Descriptions',
          description: 'Good use of data-driven metrics and business impact statements.',
        },
      ],
      improvements: [
        {
          id: 1,
          title: 'Missing Certifications',
          description: 'Consider adding relevant certifications like Google Analytics or Tableau Desktop Specialist.',
        },
        {
          id: 2,
          title: 'Weak SQL Keywords',
          description: 'Mention specific SQL databases (MySQL, PostgreSQL) you have worked with.',
        },
        {
          id: 3,
          title: 'No Portfolio Link',
          description: 'Add GitHub, Kaggle, or personal portfolio links to showcase your work.',
        },
      ],
      missingKeywords: [
        'Data Visualization',
        'Business Intelligence',
        'Statistical Analysis',
        'A/B Testing',
        'ETL Process',
        'Data Warehouse',
      ],
      tips: [
        {
          id: 1,
          title: 'Highlight Tool Proficiency',
          description:
            'Create a dedicated "Technical Skills" section listing tools and years of experience with each.',
        },
        {
          id: 2,
          title: 'Quantify Your Impact',
          description:
            'Use specific metrics: "Reduced data processing time by 40%" instead of "Optimized data processes".',
        },
        {
          id: 3,
          title: 'Include Project Examples',
          description:
            'Mention specific datasets or business problems you solved, e.g., "Analyzed 500K transactions to identify fraud patterns".',
        },
      ],
    },
    'Product Manager': {
      score: 82,
      atsPercentage: 85,
      keywordMatchPercentage: 59,
      atsStatus: 'High',
      keywordStatus: 'Average',
      strengths: [
        {
          id: 1,
          title: 'Leadership Experience',
          description: 'Strong demonstration of team leadership and cross-functional collaboration.',
        },
        {
          id: 2,
          title: 'Business Acumen',
          description: 'Clear connection between product decisions and business outcomes.',
        },
        {
          id: 3,
          title: 'Well-Structured Content',
          description: 'Easy to follow progression and clear responsibility descriptions.',
        },
      ],
      improvements: [
        {
          id: 1,
          title: 'Vague Impact Metrics',
          description: 'Replace vague terms with specific numbers. "Increased engagement by 25%" is better than "boosted user engagement".',
        },
        {
          id: 2,
          title: 'Missing Customer Focus',
          description: 'Highlight customer research and user feedback incorporation in your work.',
        },
        {
          id: 3,
          title: 'No Go-to-Market Details',
          description: 'Add information about product launches and go-to-market strategy execution.',
        },
      ],
      missingKeywords: [
        'Product Roadmap',
        'User Research',
        'Market Analysis',
        'Feature Prioritization',
        'Competitive Analysis',
        'Product Launch',
      ],
      tips: [
        {
          id: 1,
          title: 'Emphasize Product Sense',
          description:
            'Include specific examples of market research, competitive analysis, and how you identified gaps.',
        },
        {
          id: 2,
          title: 'Add Strategic Thinking',
          description:
            'Highlight how your decisions aligned with company vision and strategy, not just execution.',
        },
        {
          id: 3,
          title: 'Showcase Cross-Functional Leadership',
          description:
            'Mention how you worked with Engineering, Design, Marketing, and Sales teams to deliver results.',
        },
      ],
    },
  };

  // Return mock data for selected role, or a generic template
  return (
    analysisDatabase[jobRole] || {
      score: 80,
      atsPercentage: 87,
      keywordMatchPercentage: 65,
      atsStatus: 'High',
      keywordStatus: 'Average',
      strengths: [
        { id: 1, title: 'Experience', description: 'Relevant experience in your field.' },
        { id: 2, title: 'Formatting', description: 'Good document structure.' },
      ],
      improvements: [
        { id: 1, title: 'Keywords', description: 'Add more industry-specific keywords.' },
      ],
      missingKeywords: ['Industry Keyword 1', 'Industry Keyword 2', 'Industry Keyword 3'],
      tips: [
        { id: 1, title: 'Tip 1', description: 'Consider adding more specific achievements.' },
      ],
    }
  );
};
