import Add from './svg/add.svg';
import Filter from './svg/filter.svg';
import Groups from './svg/groups.svg';
import Back from './svg/back.svg';

const icons = {
  Add,
  Filter,
  Groups,
  Back,
};

type Name = keyof typeof icons;

type Props = {
  name: Name
  size?: number
  className?: string
};

const DEFAULT_SIZE = 24;

export function Icon({ name, size = DEFAULT_SIZE, className }: Props) {
  const SvgComponent = icons[name];

  return (
    <SvgComponent
      style={{ height: `${size}px`, width: `${size}px` }}
      className={className}
    />
  );
};
