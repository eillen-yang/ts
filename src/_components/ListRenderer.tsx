export default function ListRenderer<T>({
  items,
  renderItem,
  onDelete,
}: {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  onDelete?: (index: number) => void;
}) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>
          {renderItem(item, index)}
          {onDelete && <button onClick={() => onDelete(index)}>delete</button>}
        </li>
      ))}
    </ul>
  );
}
