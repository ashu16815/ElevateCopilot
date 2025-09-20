'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function BlogPost() {
  const { slug } = useParams();

  // Sample blog posts data - in production, this would come from a CMS or markdown files
  const posts: Record<string, { title: string; content: string; date: string; author: string }> = {
    'excel-ai-prompts-save-time': {
      title: "5 Excel AI Prompts That Save 2 Hours Daily",
      content: `
# 5 Excel AI Prompts That Save 2 Hours Daily

Transform your spreadsheet work with these proven AI prompts that automate repetitive tasks and generate insights.

## 1. Data Analysis Summary

**Prompt:** "Analyze this data and provide a summary of key trends, outliers, and recommendations."

This prompt works wonders when you have large datasets and need quick insights without manually scanning through rows.

## 2. Formula Generation

**Prompt:** "Create an Excel formula that [describe what you want to calculate] using the data in columns A through E."

Perfect for complex calculations you're not sure how to build.

## 3. Data Cleaning Instructions

**Prompt:** "Identify and suggest fixes for data quality issues in this spreadsheet, including duplicates, missing values, and formatting inconsistencies."

Saves hours of manual data cleaning work.

## 4. Chart Recommendations

**Prompt:** "What type of chart would best visualize this data and why? Provide specific formatting suggestions."

Helps you choose the right visualization for your data story.

## 5. Report Generation

**Prompt:** "Create a executive summary report based on this data, highlighting the top 3 insights and 2 recommendations."

Turns raw data into actionable business insights.

## Pro Tips

- Always provide context about your data when using these prompts
- Be specific about the format you want the output in
- Test prompts with small datasets first
- Save successful prompts for reuse

These prompts can transform how you work with Excel, turning hours of manual work into minutes of AI-assisted analysis.
      `,
      date: "2024-12-15",
      author: "ElevateCopilot Team"
    },
    'ai-safe-workflows-teams': {
      title: "Building AI-Safe Workflows in Teams",
      content: `
# Building AI-Safe Workflows in Teams

How to use Microsoft Copilot responsibly while protecting sensitive company data and maintaining productivity.

## Understanding Data Sensitivity

Before using AI tools, classify your data:

- **Public**: Safe for any AI tool
- **Internal**: Use only company-approved AI tools
- **Confidential**: Avoid AI tools entirely
- **Restricted**: Never use AI tools

## Best Practices for Teams

### 1. Data Classification
Always check your organization's data classification policy before using AI tools.

### 2. Use Approved Tools
Stick to company-approved AI tools like Microsoft Copilot for Business.

### 3. Review Outputs
Always review AI-generated content before sharing or using it.

### 4. Train Your Team
Ensure everyone understands AI safety guidelines.

## Microsoft Copilot Safety Features

- Data residency controls
- Audit logging
- Content filtering
- User access controls

## Creating Safe Workflows

1. **Identify safe use cases** - Start with non-sensitive tasks
2. **Document processes** - Create clear guidelines
3. **Monitor usage** - Track what's being processed
4. **Regular reviews** - Update policies as needed

## Common Pitfalls to Avoid

- Don't paste sensitive data into public AI tools
- Don't rely on AI for critical business decisions
- Don't ignore company policies
- Don't skip the review process

Building AI-safe workflows protects your organization while maximizing productivity benefits.
      `,
      date: "2024-12-10",
      author: "ElevateCopilot Team"
    },
    'meeting-notes-action-items-ai': {
      title: "From Meeting Notes to Action Items in 3 Steps",
      content: `
# From Meeting Notes to Action Items in 3 Steps

A practical guide to using AI for meeting transcription, summarization, and follow-up task generation.

## Step 1: Capture the Meeting

### Use AI Transcription
- Microsoft Teams has built-in transcription
- Otter.ai for external meetings
- Rev.com for high-accuracy needs

### Pro Tips
- Test your setup before important meetings
- Ensure good audio quality
- Get speaker identification working

## Step 2: AI Summarization

### Prompt Template
"Summarize this meeting transcript and extract:
1. Key decisions made
2. Action items with owners and deadlines
3. Next steps
4. Open questions that need follow-up"

### Customize for Your Needs
- Add specific sections you always need
- Include your team's terminology
- Specify the output format

## Step 3: Generate Action Items

### AI Action Item Extraction
"Create a task list from this meeting summary with:
- Clear, actionable items
- Assigned owners
- Realistic deadlines
- Priority levels"

### Follow-up Automation
- Set up calendar reminders
- Create project management tasks
- Send follow-up emails

## Tools and Integrations

### Microsoft Ecosystem
- Teams + Copilot for transcription
- OneNote for note-taking
- Planner for task management

### Third-Party Options
- Notion AI for organization
- Asana for project management
- Slack for team communication

## Best Practices

1. **Consistency** - Use the same process every time
2. **Review** - Always check AI outputs
3. **Follow-up** - Track action item completion
4. **Improve** - Refine your prompts based on results

This 3-step process turns meeting chaos into organized action, saving hours every week.
      `,
      date: "2024-12-05",
      author: "ElevateCopilot Team"
    }
  };

  const post = posts[String(slug)] || {
    title: "Post Not Found",
    content: "The blog post you're looking for doesn't exist.",
    date: new Date().toISOString().split('T')[0],
    author: "ElevateCopilot Team"
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="ec-hero">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="mb-4">
            <Link href="/blog" className="ec-link">
              ← Back to Blog
            </Link>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-blue-100">
            <span>By {post.author}</span>
            <span>•</span>
            <span>{new Date(post.date).toLocaleDateString('en-NZ', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="ec-card p-8">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ 
                __html: post.content
                  .replace(/\n/g, '<br>')
                  .replace(/#{1,6}\s+(.+)/g, (match, title) => {
                    const level = match.match(/#/g)?.length || 1;
                    return `<h${level} class="text-${level === 1 ? '3xl' : level === 2 ? '2xl' : 'xl'} font-bold mb-4 mt-6">${title}</h${level}>`;
                  })
                  .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                  .replace(/\*(.+?)\*/g, '<em>$1</em>')
                  .replace(/^(\d+\.\s+.+)$/gm, '<li class="mb-2">$1</li>')
                  .replace(/^(\*\s+.+)$/gm, '<li class="mb-2">$1</li>')
              }}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
