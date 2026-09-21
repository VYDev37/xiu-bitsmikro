CREATE TABLE "bazi_charts" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"nama" text NOT NULL,
	"birth_date" text NOT NULL,
	"birth_time" text NOT NULL,
	"data" text NOT NULL,
	"created_at" bigint DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE "chat_messages" (
	"id" text PRIMARY KEY NOT NULL,
	"session_id" text NOT NULL,
	"role" text NOT NULL,
	"content" text NOT NULL,
	"created_at" bigint DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE "chat_sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"title" text NOT NULL,
	"created_at" bigint DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE "daily_luck" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"date" text NOT NULL,
	"reading" text NOT NULL,
	"created_at" bigint DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE "insight_cards" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"nama" text NOT NULL,
	"birth_date" text NOT NULL,
	"birth_time" text NOT NULL,
	"category" text NOT NULL,
	"content" text NOT NULL,
	"created_at" bigint DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE "monthly_calendar" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"nama" text NOT NULL,
	"birth_date" text NOT NULL,
	"birth_time" text NOT NULL,
	"month_year" text NOT NULL,
	"data" text NOT NULL,
	"created_at" bigint DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE "saved_dates" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"nama" text NOT NULL,
	"birth_date" text NOT NULL,
	"date" text NOT NULL,
	"data" text NOT NULL,
	"created_at" bigint DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"username" text NOT NULL,
	"password_hash" text NOT NULL,
	"birth_date" text,
	"birth_time" text,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "bazi_charts" ADD CONSTRAINT "bazi_charts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chat_messages" ADD CONSTRAINT "chat_messages_session_id_chat_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."chat_sessions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chat_sessions" ADD CONSTRAINT "chat_sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "daily_luck" ADD CONSTRAINT "daily_luck_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "insight_cards" ADD CONSTRAINT "insight_cards_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "monthly_calendar" ADD CONSTRAINT "monthly_calendar_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "saved_dates" ADD CONSTRAINT "saved_dates_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;