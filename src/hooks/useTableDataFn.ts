import { useCallback, useState } from 'react';

interface TableDataState<T = any> {
  loading: boolean;
  value: {
    dataSource: T[];
    pagination: {
      currentPage: number;
      pageSize: number;
      total: number;
    };
  };
}

interface UseTableDataFnOptions<P = any, R = any> {
  Fetch: (params: P) => Promise<R[]>;
  params: P;
  pageSize?: number;
}

export function useTableDataFn<P = any, R = any>({
  Fetch,
  params,
  pageSize = 10,
}: UseTableDataFnOptions<P, R>) {
  const [state, setState] = useState<TableDataState<R>>({
    loading: false,
    value: {
      dataSource: [],
      pagination: {
        currentPage: 1,
        pageSize,
        total: 0,
      },
    },
  });

  const doFetch = useCallback(
    async (searchParams?: any) => {
      setState(prev => ({ ...prev, loading: true }));
      try {
        const mergedParams = {
          ...params,
          ...searchParams,
        };

        const result = await Fetch(mergedParams);

        setState({
          loading: false,
          value: {
            dataSource: result,
            pagination: {
              currentPage: searchParams?.currentPage || 1,
              pageSize,
              total: result.length,
            },
          },
        });
      } catch (error) {
        setState(prev => ({ ...prev, loading: false }));
        console.error('Fetch table data failed:', error);
      }
    },
    [Fetch, params, pageSize],
  );

  return [state, doFetch] as const;
}
