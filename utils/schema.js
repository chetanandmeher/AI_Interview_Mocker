import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

// creating the schema for the database table
export const MockInterview = pgTable('mockInterview', {
    id:serial('id').primaryKey(),
    jsonMockResponse:text('jsonMockResponse').notNull(),
    jobPosition:text('jobPosition').notNull(),
    jobDescription:varchar('jobDescription').notNull(),
    jobExperience:varchar('jobExperience').notNull(),
    createdBy:varchar('createdBy').notNull(),
    createdAt:varchar('createdAt').notNull(),
    mockId:varchar('mockId').notNull(),
}) 

// // Answer and feedback table
// export const UserAnswerAndFeedback = pgTable( 'userAnswerAndFeedback',{
//     id:serial("id").primaryKey(),
//     mockIdRef:varchar("mockId").notNull(),
//     question:varchar('question').notNull(),
//     correctAnswer:text('correctAnswer').notNull(),
//     feedback:text('feedback').notNull(),
//     rating:varchar('rating').notNull(),
//     userEmail:varchar('userEmail').notNull(),
//     createAt:varchar("createdAt").notNull(),

// }) 
 