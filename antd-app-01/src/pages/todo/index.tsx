import React, { FC, useRef, useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { List, Card, Button, Dropdown, Menu, Modal} from 'antd';

import { connect, Dispatch } from 'umi';
import { StateType } from './model';
import { ToDoListItemDataType } from './data.d';

import OperationModal from './components/OperationModal';
import { findDOMNode } from 'react-dom';

interface ToDoListProps {
  listAndtodoList: StateType;
  dispatch: Dispatch<any>;
  loading: boolean;
}

export const ToDoList: FC<ToDoListProps> = (props) => {
  const addBtn = useRef(null);
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      hideInForm: true,
    },
    {
      title: '标题',
      dataIndex: 'title',
      rules: [
        {
          required: true,
          message: '待办事项标题不能为空',
        },
      ]
    },
  ]
  const {
    loading,
    dispatch,
    listAndtodoList: { todoList },
  } = props;
  const [done, setDone] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [current, setCurrent] = useState<Partial<ToDoListItemDataType> | undefined>(undefined);

  useEffect(() => {
    dispatch({
      type: 'listAndtodoList/fetch',
      payload: {
      },
    });
  }, [1]);

  const showModal = () => {
    setVisible(true);
    setCurrent(undefined);
  };

  const showEditModal = (item: ToDoListItemDataType) => {
    setVisible(true);
    setCurrent(item);
  };

  const deleteItem = (id: string) => {
    dispatch({
      type: 'listAndtodoList/submit',
      payload: { id },
    });
  };

  const editAndDelete = (key: string, currentItem: ToDoListItemDataType) => {
    if (key === 'edit') showEditModal(currentItem);
    else if (key === 'delete') {
      Modal.confirm({
        title: '删除任务',
        content: '确定删除该任务吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: () => deleteItem(currentItem.id),
      });
    }
  };

  const MoreBtn: React.FC<{
    item: ToDoListItemDataType;
  }> = ({ item }) => (
    <Dropdown
      overlay={
        <Menu onClick={({ key }) => editAndDelete(key, item)}>
          <Menu.Item key="edit">编辑</Menu.Item>
          <Menu.Item key="delete">删除</Menu.Item>
        </Menu>
      }
    >
      <a>
        更多 <DownOutlined />
      </a>
    </Dropdown>
  );


  const setAddBtnblur = () => {
    if (addBtn.current) {
      // eslint-disable-next-line react/no-find-dom-node
      const addBtnDom = findDOMNode(addBtn.current) as HTMLButtonElement;
      setTimeout(() => addBtnDom.blur(), 0);
    }
  };

  const handleDone = () => {
    setAddBtnblur();

    setDone(false);
    setVisible(false);
  };

  const handleCancel = () => {
    setAddBtnblur();
    setVisible(false);
  };

  const handleSubmit = (values: ToDoListItemDataType) => {
    const id = current ? current.id : '';

    setAddBtnblur();

    setDone(true);
    dispatch({
      type: 'listAndtodoList/submit',
      payload: { ...values },
    });
  };

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    pageSize: 5,
    total: 50,
  };

  return (
    <div>
      <PageContainer>
        <Card>
          <Button
            type="dashed"
            style={{ width: '100%', marginBottom: 8 }}
            onClick={showModal}
            ref={addBtn}
          >
            <PlusOutlined />
              添加
            </Button>
          <List
            size="large"
            rowKey="id"
            loading={loading}
            pagination={paginationProps}
            dataSource={todoList}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <a
                    key="edit"
                    onClick={(e) => {
                      e.preventDefault();
                      showEditModal(item);
                    }}
                  >
                    编辑
                  </a>,
                  <MoreBtn key="more" item={item} />,
                ]}
              >
                <List.Item.Meta
                  title={<a>{item.title}</a>}
                />
              </List.Item>
            )}
          />
        </Card>
        
      </PageContainer>
      <OperationModal
        done={done}
        current={current}
        visible={visible}
        onDone={handleDone}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default connect(
  ({
    listAndtodoList,
    loading,
  }: {
    listAndtodoList: StateType;
    loading: {
      models: { [key: string]: boolean };
    };
  }) => ({
    listAndtodoList,
    loading: loading.models.listAndtodoList,
  }),
)(ToDoList);
