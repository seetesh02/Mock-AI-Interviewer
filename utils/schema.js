import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const mai=pgTable('mai',{
    id:serial('id').primaryKey(),
    jmr:text('jmr').notNull(),
    jp:varchar('jp').notNull(),
    jd:varchar('jd').notNull(),
    je:varchar('je').notNull(),
    cb:varchar('cb').notNull(),
    ca:varchar('ca'),
    mi:varchar('mi').notNull()
})

export const UserAnswer=pgTable('userAnswer',{
    id:serial('id').primaryKey(),
    mockIdRef:varchar('mockId').notNull(),
    question:varchar('question').notNull(),
    correctAns:text('correctAns'),
    usserAns:text('userAns'),
    feedback:text('feedback'),
    rating:varchar('rating'),
    userEmail:varchar('userEmail'),
    createdAt:varchar('createdAt'),
})