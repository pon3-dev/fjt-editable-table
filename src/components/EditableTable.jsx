import React, { useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  IconButton,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';

function EditableTable() {
  const [data, setData] = useState([
    { id: 1, deadline: '2024-04-11T10:54', task: 'Todoアプリ完成' },
    { id: 2, deadline: '2024-04-12T10:54', task: 'コードの説明会' },
  ]);
  const [newDeadline, setNewDeadline] = useState('');
  const [newTask, setNewTask] = useState('');

  const handleAddRow = () => {
    const newId = data.length > 0 ? Math.max(...data.map(d => d.id)) + 1 : 1;
    const newRow = {
      id: newId,
      deadline: newDeadline,
      task: newTask,
    };
    setData([...data, newRow]);
    setNewDeadline('');
    setNewTask('');
  };

  const handleInputChangeDeadline = (e, id) => {
    const newData = data.map(item => {
      if (item.id === id) {
        return {
          id: item.id,
          deadline: e.target.value,
          task: item.task,
        };
      }
      return item;
    });
    setData(newData);
  };

  const handleInputChangeTask = (e, id) => {
    const newData = data.map(item => {
      if (item.id === id) {
        return {
          id: item.id,
          deadline: item.deadline,
          task: e.target.value,
        };
      }
      return item;
    });
    setData(newData);
  };

  const handleRemoveRows = id => {
    setData(data.filter(item => item.id !== id));
  };

  return (
    <>
      <Table varuant="simple">
        <Thead>
          <Th>ID</Th>
          <Th>期限</Th>
          <Th>タスク内容</Th>
          <Th></Th>
        </Thead>
        <Tbody>
          <Tr>
            <Td></Td>
            <Td>
              <Input
                placeholder="期限"
                size="md"
                type="datetime-local"
                value={newDeadline}
                onChange={e => setNewDeadline(e.target.value)}
              />
            </Td>
            <Td>
              <Input
                placeholder="タスク内容"
                value={newTask}
                onChange={e => setNewTask(e.target.value)}
              />
            </Td>
            <Td>
              <IconButton
                aria-label="追加"
                icon={<AddIcon />}
                onClick={handleAddRow}
              />
            </Td>

            <Td></Td>
          </Tr>
          {data.map(row => (
            <Tr key={row.id}>
              <Td>{row.id}</Td>
              <Td>
                <Input
                  value={row.deadline}
                  onChange={e => handleInputChangeDeadline(e, row.id)}
                />
              </Td>
              <Td>
                <Input
                  value={row.task}
                  onChange={e => handleInputChangeTask(e, row.id, 'task')}
                />
              </Td>
              <Td>
                <IconButton
                  aria-label="行を削除"
                  icon={<DeleteIcon />}
                  onClick={() => handleRemoveRows(row.id)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
}
export default EditableTable;
