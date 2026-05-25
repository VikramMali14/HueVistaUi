'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectApi } from '@/lib/api';
import type { Project } from '@/types';

export function useProjects() {
  return useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data } = await projectApi.list();
      return data;
    },
  });
}

export function useProject(id: string) {
  return useQuery<Project>({
    queryKey: ['project', id],
    queryFn: async () => {
      const { data } = await projectApi.get(id);
      return data;
    },
    enabled: !!id,
  });
}

export function useProjectStatus(id: string, enabled: boolean) {
  return useQuery({
    queryKey: ['project-status', id],
    queryFn: async () => {
      const { data } = await projectApi.pollStatus(id);
      return data;
    },
    enabled,
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      return status === 'SEGMENTING' ? 1500 : false;
    },
  });
}

export function useSegmentProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, useImageCleaner }: { id: string; useImageCleaner?: boolean }) =>
      projectApi.segment(id, useImageCleaner),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: ['project', id] });
    },
  });
}

export function useUpdateRegionColor() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ projectId, regionId, hex }: { projectId: string; regionId: string; hex: string }) =>
      projectApi.updateRegionColor(projectId, regionId, hex),
    onMutate: async ({ projectId, regionId, hex }) => {
      await qc.cancelQueries({ queryKey: ['project', projectId] });
      const prev = qc.getQueryData<Project>(['project', projectId]);
      qc.setQueryData<Project>(['project', projectId], (old) =>
        old
          ? { ...old, regions: old.regions.map((r) => (r.id === regionId ? { ...r, colorHex: hex } : r)) }
          : old
      );
      return { prev };
    },
    onError: (_err, { projectId }, ctx) => {
      if (ctx?.prev) qc.setQueryData(['project', projectId], ctx.prev);
    },
  });
}
