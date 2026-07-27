"use client"
import { Component, Fragment } from 'react';
import { ListItem } from '@/components/molecules/ListItem';
import PlaceholderImage from '@/icons/ic-placeholder-profil.svg';
import MailIcon from '@/icons/ic-mail.svg';
import MenuIcon from '@/icons/ic-menu.svg';
import take from 'lodash/fp/take';
import sort from 'lodash/fp/sortBy';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { resetServerContext } from 'react-beautiful-dnd';

export interface DraggableCandidateListProps {
  lastRow?: Function;
  data: any;
  loading: boolean;
  changeOrder?: Function;
  disabled?: boolean;
}

export interface DraggableCandidateListState {
  items: any;
}

class DraggableCandidateList extends Component<
  DraggableCandidateListProps,
  DraggableCandidateListState
> {
  constructor(props: DraggableCandidateListProps) {
    super(props);
    this.onDragEnd = this.onDragEnd.bind(this);
    resetServerContext();
    const sortedData = [...props.data];
    sortedData.sort((a, b) => (a.queuePosition > b.queuePosition ? 1 : -1));
    this.state = {
      items: sortedData,
    };
  }

  // a little function to help us with reordering the result
  reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = this.reorder(
      this.state.items,
      result.source.index,
      result.destination.index,
    );

    this.setState(
      {
        items,
      },
      () => {
        this.confirmChangeOrder();
      },
    );
  }

  confirmChangeOrder() {
    const { items } = this.state;
    const { changeOrder } = this.props;
    changeOrder(items);
  }

  render() {
    const { lastRow, loading, disabled } = this.props;
    const { items } = this.state;

    return (
      <Fragment>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable" isDragDisabled={disabled}>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {items?.map(({ candidate, id }, index) => {
                  const {
                    firstName,
                    lastName,
                    imageUrlSmall,
                    education,
                  } = candidate;
                  return (
                    <Draggable
                      key={id}
                      draggableId={id.toString()}
                      isDragDisabled={disabled}
                      index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}>
                          <ListItem
                            style={{ marginBottom: 10 }}
                            loading={loading}
                            key={id}>
                            <ListItem.Image
                              Placeholder={PlaceholderImage}
                              alt={`${firstName} ${lastName}`}
                              src={imageUrlSmall}
                            />
                            <ListItem.Title>
                              {firstName} {lastName}
                            </ListItem.Title>
                            <ListItem.Body>
                              {take(2, sort('startDate', education)).map(
                                ({ id, university, educationLevel, major }) => (
                                  <div
                                    key={id}
                                    className="truncate w-44 md:w-48 xl:w-4/5 lg:max-w-sm xl:max-w-md xl:whitespace-pre-wrap hidden lg:block mr-0">
                                    {university?.name} - {educationLevel?.name}{' '}
                                    in {major?.name}
                                  </div>
                                ),
                              )}
                            </ListItem.Body>
                            <ListItem.Actions>
                              <div className="flex space-x-2 items-center">
                                <div>
                                  <MailIcon
                                    className="w-6 h-6 m-2 fill-current cursor-pointer"
                                    onClick={() => {
                                      const href =
                                        '/company/chatroom?candidateId=' +
                                        candidate.id;
                                      const link = document.createElement('a');
                                      link.href = href;
                                      document.body.appendChild(link);
                                      link.click();
                                      document.body.removeChild(link);
                                    }}
                                  />
                                </div>
                                {lastRow ? lastRow(id) : null}
                                {disabled ? (
                                  <></>
                                ) : (
                                  <div>
                                    <MenuIcon className="w-8 h-8 mr-8 ml-8 text-primary-light fill-current" />
                                  </div>
                                )}
                              </div>
                            </ListItem.Actions>
                          </ListItem>
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Fragment>
    );
  }
}

export default DraggableCandidateList;
