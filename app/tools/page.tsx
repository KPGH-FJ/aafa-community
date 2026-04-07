import { Container } from '@/components/ui/Container';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';

const tools = [
  {
    name: 'Cursor',
    description: 'AI 驱动的代码编辑器，内置 GPT-4，能自动补全代码、解释代码、甚至根据注释生成代码。',
    category: '编程开发',
    url: 'https://cursor.sh',
    tags: ['AI编程', '代码编辑器', '效率工具'],
  },
  {
    name: 'ChatGPT',
    description: 'OpenAI 开发的对话 AI，能回答问题、写作、翻译、编程辅助等多种任务。',
    category: '通用AI',
    url: 'https://chat.openai.com',
    tags: ['对话AI', '内容创作', '学习助手'],
  },
  {
    name: 'Midjourney',
    description: '通过文本描述生成高质量艺术图像的 AI 工具，适合设计师和创意工作者。',
    category: '图像生成',
    url: 'https://midjourney.com',
    tags: ['AI绘画', '图像生成', '创意设计'],
  },
  {
    name: 'Notion AI',
    description: '集成在 Notion 中的 AI 助手，帮助写作、总结、翻译和头脑风暴。',
    category: '生产力',
    url: 'https://notion.so',
    tags: ['笔记', '协作', 'AI写作'],
  },
  {
    name: 'Claude',
    description: 'Anthropic 开发的 AI 助手，以安全性和有用性著称，擅长长文本分析。',
    category: '通用AI',
    url: 'https://claude.ai',
    tags: ['对话AI', '长文本', '分析助手'],
  },
  {
    name: 'Perplexity',
    description: 'AI 驱动的搜索引擎，提供带有引用来源的直接答案，适合研究和学习。',
    category: '搜索研究',
    url: 'https://perplexity.ai',
    tags: ['AI搜索', '研究工具', '知识获取'],
  },
];

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      {/* Hero */}
      <section className="bg-[#F0EEEB] py-16">
        <Container>
          <SectionTitle
            title="AI 工具推荐"
            subtitle="我们精选的实用 AI 工具，帮助你提升工作效率"
            centered
          />
        </Container>
      </section>

      {/* Tools Grid */}
      <section className="py-16">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool) => (
              <Card key={tool.name} className="flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-[#2C2C2C]">
                      {tool.name}
                    </h3>
                    <span className="text-xs text-[#C9A89A] font-medium">
                      {tool.category}
                    </span>
                  </div>
                </div>
                
                <p className="text-[#5C5852] text-sm mb-4 flex-grow">
                  {tool.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {tool.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 bg-[#F0EEEB] text-[#7A7670] rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-2 text-sm font-medium text-[#C9A89A] border border-[#C9A89A] rounded-lg hover:bg-[#C9A89A] hover:text-white transition-colors"
                >
                  访问官网 →
                </a>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#F0EEEB]">
        <Container>
          <div className="text-center">
            <h2 className="text-2xl font-serif font-bold text-[#2C2C2C] mb-4">
              有推荐的工具？
            </h2>
            <p className="text-[#5C5852] mb-6">
              如果你发现了好用的 AI 工具，欢迎分享给社区
            </p>
            <a
              href="mailto:hello@aafa.com"
              className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-[#C9A89A] rounded-full hover:bg-[#B89789] transition-colors"
            >
              推荐工具
            </a>
          </div>
        </Container>
      </section>
    </main>
  );
}
