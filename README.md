# MVP
## Authors
- [Coralid](https://github.com/Coralid)
- [AustinC02](https://github.com/AustinC02)

## Planning « TODO
| Date     | Assignee  | Work          |     Status      |
|----------|-----------|---------------|:---------------:|
| 1/3/2025 | HS & AC   | Brainstorming | :green_circle:  |
| 1/4/2025 | HS        | Visual Markup | :yellow_circle: |
| 1/4/2025 | AC        | Pseudo Code   |  :red_circle:   |

## Topic
Create a program that helps students manage their personal finances by tracking account balances, income and expenses. The program should allow users to input details about their income sources and expenses, including the amount, category, and date of each transaction.
It should provide features to view the current balance, generate summaries of income and expenses over specified periods (e.g., weekly, monthly), and categorize expenses to show spending patterns. Additionally, the program should include functionality to update or delete existing entries and offer search and filter options to easily find specific transactions.

### TL;DR
Make a program that has/does the following:
- Account Balances
- Track Income
- Track Expenses
- Transaction Details (Income & Expense)
    - Amount, Category, Date, etc.
- View Current Balance
- Generate Summaries
    - Specific Time Periods
    - Categorize Expenses to show spending patterns
- Update or Delete existing entries
- Search and Filter to aid transaction searching

## Notes From Austin
- We only really need two pages here:
- The home page, and the page where you view all the transactions.
- Modals would help cut down on the clutter, and honestly, it's probably for the best.


## Visual Markup

---

```bash
# Recommended for most uses
DATABASE_URL=postgres://neondb_owner:0vhBVcs4REmx@ep-flat-smoke-a59u5ami-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require

# For uses requiring a connection without pgbouncer
DATABASE_URL_UNPOOLED=postgresql://neondb_owner:0vhBVcs4REmx@ep-flat-smoke-a59u5ami.us-east-2.aws.neon.tech/neondb?sslmode=require

# Parameters for constructing your own connection string
PGHOST=ep-flat-smoke-a59u5ami-pooler.us-east-2.aws.neon.tech
PGHOST_UNPOOLED=ep-flat-smoke-a59u5ami.us-east-2.aws.neon.tech
PGUSER=neondb_owner
PGDATABASE=neondb
PGPASSWORD=0vhBVcs4REmx

# Parameters for Vercel Postgres Templates
POSTGRES_URL=postgres://neondb_owner:0vhBVcs4REmx@ep-flat-smoke-a59u5ami-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require
POSTGRES_URL_NON_POOLING=postgres://neondb_owner:0vhBVcs4REmx@ep-flat-smoke-a59u5ami.us-east-2.aws.neon.tech/neondb?sslmode=require
POSTGRES_USER=neondb_owner
POSTGRES_HOST=ep-flat-smoke-a59u5ami-pooler.us-east-2.aws.neon.tech
POSTGRES_PASSWORD=0vhBVcs4REmx
POSTGRES_DATABASE=neondb
POSTGRES_URL_NO_SSL=postgres://neondb_owner:0vhBVcs4REmx@ep-flat-smoke-a59u5ami-pooler.us-east-2.aws.neon.tech/neondb
POSTGRES_PRISMA_URL=postgres://neondb_owner:0vhBVcs4REmx@ep-flat-smoke-a59u5ami-pooler.us-east-2.aws.neon.tech/neondb?pgbouncer=true&connect_timeout=15&sslmode=require
```