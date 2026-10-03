export interface Skill {
  icon: string;
  title: string;
  label: string;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Frontend',
    skills: [
      { icon: 'A', title: 'Angular', label: 'Enterprise Frontend' },
      { icon: 'TS', title: 'TypeScript', label: 'Typed Development' },
      { icon: 'JS', title: 'JavaScript', label: 'Interactive Applications' },
      { icon: '5', title: 'HTML5', label: 'Semantic UI' },
      { icon: '3', title: 'CSS3', label: 'Responsive Design' },
      { icon: 'Rx', title: 'RxJS', label: 'Reactive Programming' },
      { icon: 'RF', title: 'Angular Reactive Forms', label: 'Dynamic Forms' },
      { icon: 'CLI', title: 'Angular CLI', label: 'Project Tooling' }
    ]
  },
  {
    title: 'Backend',
    skills: [
      { icon: 'C#', title: 'C#', label: 'Backend Development' },
      { icon: '.N', title: '.NET', label: 'Application Development' },
      { icon: 'AC', title: 'ASP.NET Core', label: 'Web Applications' },
      { icon: 'API', title: 'ASP.NET Core Web API', label: 'REST APIs' },
      { icon: 'MVC', title: 'ASP.NET MVC', label: 'Web Development' },
      { icon: 'EF', title: 'Entity Framework Core', label: 'Data Access' },
      { icon: 'LQ', title: 'LINQ', label: 'Data Querying' },
      { icon: 'R', title: 'REST APIs', label: 'API Integration' }
    ]
  },
  {
    title: 'Database',
    skills: [
      { icon: 'PG', title: 'PostgreSQL', label: 'Relational Database' },
      { icon: 'SQL', title: 'Microsoft SQL Server', label: 'Database Management' }
    ]
  },
  {
    title: 'Architecture & Engineering',
    skills: [
      { icon: 'CA', title: 'Clean Architecture', label: 'Maintainable Systems' },
      { icon: 'DDD', title: 'Domain-Driven Design (DDD)', label: 'Domain Modeling' },
      { icon: 'CQ', title: 'CQRS', label: 'Application Architecture' },
      { icon: 'S', title: 'SOLID Principles', label: 'Clean Code' },
      { icon: 'DP', title: 'Design Patterns', label: 'Reusable Solutions' },
      { icon: 'OOP', title: 'Object-Oriented Programming', label: 'Software Design' },
      { icon: 'DI', title: 'Dependency Injection', label: 'Loose Coupling' }
    ]
  },
  {
    title: 'Security',
    skills: [
      { icon: 'JWT', title: 'JWT', label: 'Token Authentication' },
      { icon: 'RB', title: 'RBAC', label: 'Role-Based Access Control' },
      { icon: 'AU', title: 'Authentication', label: 'Secure Access' },
      { icon: 'AZ', title: 'Authorization', label: 'Access Control' }
    ]
  },
  {
    title: 'DevOps & Version Control',
    skills: [
      { icon: 'D', title: 'Docker', label: 'Containerization' },
      { icon: 'CI', title: 'CI/CD', label: 'Automated Delivery' },
      { icon: 'Git', title: 'Git', label: 'Version Control' },
      { icon: 'GH', title: 'GitHub', label: 'Code Collaboration' },
      { icon: 'Az', title: 'Microsoft Azure', label: 'Cloud Platform' }
    ]
  },
  {
    title: 'AI & Developer Tools',
    skills: [
      { icon: 'CP', title: 'GitHub Copilot', label: 'AI-Assisted Development' },
      { icon: 'VS', title: 'Visual Studio Code', label: 'Development Environment' },
      { icon: 'VS', title: 'Visual Studio', label: '.NET Development' },
      { icon: 'GPT', title: 'ChatGPT', label: 'AI-Assisted Development' }
    ]
  },
  {
    title: 'Enterprise & Integrations',
    skills: [
      { icon: 'OS', title: 'OneStream EPM', label: 'Enterprise Performance Management' },
      { icon: 'H', title: 'Hangfire', label: 'Background Jobs' },
      { icon: 'SG', title: 'SendGrid', label: 'Email Integration' },
      { icon: 'TW', title: 'Twilio', label: 'Communication APIs' },
      { icon: 'GM', title: 'Google Maps API', label: 'Maps Integration' }
    ]
  }
];
