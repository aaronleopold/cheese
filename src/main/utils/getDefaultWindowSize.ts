import { rawStore } from '../../store';
import { SIZES } from '../../store/window';

const defaultStateString =
  '{"state":{"theme":"light","size":"sm","width":650,"height":720},"version":0}';

export default function getDefaultWindowSize() {
  const cheeseStore = JSON.parse(
    (rawStore.get('cheese-store') as any) ?? defaultStateString
  );

  const size = cheeseStore?.state?.size;

  return SIZES[size] ?? SIZES.md;
}
