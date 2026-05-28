export enum ChatConversationMode {
  Chat = "chat",
  Contact = "contact",
}

export enum ChatActionType {
  Navigate = "navigate",
  StartContactFlow = "start_contact_flow",
  CompleteContactFlow = "complete_contact_flow",
}

export type ChatRequestPayload = {
  message: string;
  session_id: string;
  mode: ChatConversationMode;
  current_location: string;
};

export type ChatNavigationAction = {
  type: ChatActionType.Navigate;
  target: string;
  payload?: Record<string, unknown>;
};

export type ChatContactFlowAction = {
  type: ChatActionType.StartContactFlow | ChatActionType.CompleteContactFlow;
  payload?: Record<string, unknown>;
};

export type ChatResponseAction = ChatNavigationAction | ChatContactFlowAction;

export type ChatResponseSource = {
  source_file: string;
  page: number;
  chunk_index: number;
};

export type ChatResponsePayload = {
  reply: string;
  session_id: string;
  action?: ChatResponseAction | null;
  sources?: ChatResponseSource[];
};
