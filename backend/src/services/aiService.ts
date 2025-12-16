import axios from 'axios';
import { AIResponse } from '../models/schema';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '';
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

// Default model - can be changed to claude, gpt-4, etc.
const DEFAULT_MODEL = process.env.AI_MODEL || 'openai/gpt-3.5-turbo';

/**
 * Convert natural language question to SQL query using OpenRouter API
 */
export const convertToSQL = async (question: string, schema?: string): Promise<AIResponse> => {
    try {
        const schemaContext = schema || `
Available tables:
- customers (id, name, email, city, country, signup_date)
- orders (id, customer_id, product_id, quantity, total_amount, order_date, status)
- products (id, name, category, price, stock_quantity, supplier)

Use PostgreSQL syntax.
    `;

        const prompt = `You are an expert SQL query generator. Convert the following natural language question into a valid PostgreSQL SELECT query.

Database Schema:
${schemaContext}

User Question: ${question}

Requirements:
1. Generate ONLY SELECT queries (no INSERT, UPDATE, DELETE, DROP, etc.)
2. Use proper PostgreSQL syntax
3. Include appropriate JOINs if multiple tables are needed
4. Use aliases for readability
5. Return clean, executable SQL

Respond in JSON format:
{
  "sql": "SELECT query here",
  "explanation": "Brief explanation of what the query does"
}`;

        const response = await axios.post(
            OPENROUTER_URL,
            {
                model: DEFAULT_MODEL,
                messages: [
                    {
                        role: 'system',
                        content: 'You are a SQL expert. Always respond with valid JSON containing "sql" and "explanation" fields.',
                    },
                    {
                        role: 'user',
                        content: prompt,
                    },
                ],
                temperature: 0.3,
                max_tokens: 500,
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': 'https://querysense.app',
                    'X-Title': 'QuerySense',
                },
            }
        );

        const content = response.data.choices[0]?.message?.content || '{}';

        // Try to parse JSON from the response
        let parsed;
        try {
            // Remove markdown code blocks if present
            const cleaned = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
            parsed = JSON.parse(cleaned);
        } catch (e) {
            // If parsing fails, try to extract SQL manually
            const sqlMatch = content.match(/SELECT[\s\S]+?(?:;|$)/i);
            if (sqlMatch) {
                return {
                    sql: sqlMatch[0].trim().replace(/;$/, ''),
                    explanation: 'Auto-generated SQL query',
                };
            }
            throw new Error('Failed to parse AI response');
        }

        return {
            sql: parsed.sql,
            explanation: parsed.explanation,
        };
    } catch (error: any) {
        console.error('OpenRouter API error:', error.response?.data || error.message);
        throw new Error(`AI conversion failed: ${error.message}`);
    }
};

/**
 * Generate business insights from query results
 */
export const generateInsights = async (question: string, results: any[]): Promise<string> => {
    try {
        const prompt = `You are a business analyst. Analyze the following SQL query results and provide actionable insights.

Original Question: ${question}

Query Results (first 10 rows):
${JSON.stringify(results.slice(0, 10), null, 2)}

Total Rows: ${results.length}

Provide:
1. Key findings (2-3 bullet points)
2. Business implications
3. Recommended actions

Keep it concise and business-focused.`;

        const response = await axios.post(
            OPENROUTER_URL,
            {
                model: DEFAULT_MODEL,
                messages: [
                    {
                        role: 'system',
                        content: 'You are a business analyst providing actionable insights from data.',
                    },
                    {
                        role: 'user',
                        content: prompt,
                    },
                ],
                temperature: 0.7,
                max_tokens: 400,
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': 'https://querysense.app',
                    'X-Title': 'QuerySense',
                },
            }
        );

        return response.data.choices[0]?.message?.content || 'No insights available';
    } catch (error: any) {
        console.error('Insights generation error:', error.response?.data || error.message);
        return 'Unable to generate insights at this time.';
    }
};

/**
 * Get table schema information from database
 */
export const explainQuery = async (sqlQuery: string): Promise<string> => {
    try {
        const prompt = `Explain the following SQL query in simple, non-technical language:

${sqlQuery}

Explain:
1. What data is being retrieved
2. Which tables are involved
3. Any filters or conditions
4. The expected output

Use simple language that a business user can understand.`;

        const response = await axios.post(
            OPENROUTER_URL,
            {
                model: DEFAULT_MODEL,
                messages: [
                    {
                        role: 'user',
                        content: prompt,
                    },
                ],
                temperature: 0.5,
                max_tokens: 300,
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': 'https://querysense.app',
                    'X-Title': 'QuerySense',
                },
            }
        );

        return response.data.choices[0]?.message?.content || 'No explanation available';
    } catch (error) {
        console.error('Query explanation error:', error);
        return 'Unable to explain query at this time.';
    }
};
