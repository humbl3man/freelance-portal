export const ClientStatus = {
	default: 'default',
	archived: 'archived'
};

export type Client = {
	id: string;
	userId: string;
	name: string;
	email: string | null;
	company: string | null;
	phone: string | null;
	website: string | null;
	notes: string | null;
	status: string;
	createdAt: Date | null;
	updatedAt: Date | null;
};
