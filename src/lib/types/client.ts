export type Client = {
	id: string;
	userId: string;
	name: string;
	email: string | null;
	company: string | null;
	phone: string | null;
	website: string | null;
	notes: string | null;
	archived: boolean | null;
	createdAt: Date | null;
	updatedAt: Date | null;
};
