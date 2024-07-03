/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import useSWR from 'swr';
import {
	getKeyValue,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from '@nextui-org/table';
import React from 'react';

const fetcher = (url: string) =>
	fetch(url)
		.then((res) => res.json())
		.then((data: any[]) => {
			return data.map((value, index) => {
				value.key = index;
				return value;
			});
		});

const columns = [
	{
		key: 'endpoint',
		label: 'ENDPOINT',
	},
	{
		key: 'countSuccessful',
		label: 'SUCCESSFUL',
	},
	{
		key: 'countFailed',
		label: 'FAILED',
	},
];

export default function Home() {
	const { data, error } = useSWR('http://localhost:3000/requests-statistics', fetcher);

	const tableClassNames = React.useMemo(
		() => ({
			th: ['bg-transparent', 'text-default-500', 'border-b', 'border-divider'],
			base: ['min-w-min', 'max-w-max', 'm-auto'],
			td: ['text-black'],
		}),
		[]
	);

	let content = null;
	if (error) content = <div>Failed to load</div>;
	else if (!data) content = <div className='m-auto max-w-max'>Loading...</div>;
	else {
		content = (
			<Table classNames={tableClassNames} aria-label='Request statistic table'>
				<TableHeader columns={columns}>
					{(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
				</TableHeader>
				<TableBody items={data}>
					{(item) => (
						<TableRow key={item.key}>
							{(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
						</TableRow>
					)}
				</TableBody>
			</Table>
		);
	}

	return (
		<main>
			<div className='h-screen pt-20'>{content}</div>
		</main>
	);
}
