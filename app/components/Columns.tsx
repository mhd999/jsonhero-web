import { memo } from "react";
import { useJson } from "~/hooks/useJson";
import {
  useJsonColumnViewAPI,
  useJsonColumnViewState,
} from "~/hooks/useJsonColumnView";
import { ColumnDefinition } from "~/useColumnView";
import { Column } from "./Column";
import { ColumnItem } from "./ColumnItem";

function ColumnsElement({ columns }: { columns: ColumnDefinition[] }) {
  const [json] = useJson();
  const { selectedPath, highlightedPath } = useJsonColumnViewState();
  const { goToNodeId } = useJsonColumnViewAPI();

  return (
    <div className="columns flex flex-grow overflow-x-auto no-scrollbar focus:outline-none">
      {columns.map((column) => {
        return (
          <Column
            key={column.id}
            id={column.id}
            title={column.title}
            icon={column.icon}
            highlightedPath={highlightedPath}
          >
            {column.items.map((item) => (
              <ColumnItem
                key={item.id}
                item={item}
                json={json}
                selectedPath={selectedPath}
                highlightedPath={highlightedPath}
                selectedItem={goToNodeId}
              />
            ))}
          </Column>
        );
      })}
    </div>
  );
}
export const Columns = memo(ColumnsElement);
