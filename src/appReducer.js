import {createStore, combineReducers, applyMiddleware} from "redux";
import logger from "redux-logger";
import App from "./App";

const appReducer = (state = initialState, action) => {
	switch (action.type){
		case "addEvaluation":
			var targetIndex = -1;
			for(let i=0; i < state.UserData.length; ++i)
			{
				if(state.UserData[i].Name === to)
				{
					targetIndex = i;
				}
			}
			if(targetIndex != -1)
			{
				state = {
					...state,
					UserData: state.UserData[targetIndex].Evaluation.push(action.in_review);
				};
			}
			else
			{
				state= {
					...state
				}
			}
			break;

		case "replyMessage":
			state = {
				...state,
				state.Message: [...state.Message, 
								{
									From: action.from,
									To: action.to,
									Content: action.message
								}
							   ]
			};
			break;

		case "deleteMessage":
			var tempMessage = [...state.Message];
			for(let i=0; i < tempMessage.length; ++i)
  			{
    			if(tempMessage[i].From === action.from && tempMessage[i].To === action.to && tempMessage[i].Content === action.message)
    			{
      				tempMessage.splice(i, 1);
      				break;
    			}
  			}
  			state = {
  				...state,
  				state.Message: [...tempMessage]
  			};
  			break;

  		case "acceptInvitation":
  			let counter = 0;
  			for(let i=0; i < state.UserData.length; ++i)
  			{
    			if(state.UserData[i].Name === action.from)
    			{
      				if(state.UserData[i].Member.indexOf(action.to)  == -1)
      				{
      					state.UserData[i].Member.push(action.to);
        				++counter;
      				}
    			}
    		}
    		else if(state.UserData[i].Name === action.to)
   			{
      			if(state.UserData[i].Member.indexOf(action.from)  == -1)
      			{
        			state.UserData[i].Member.push(action.from);
        			++counter;
      			}
    		}
    		else
    		{
      			//dummy
    		}

    		if(2 <= counter)
    		{
      			break;
    		}
    		state = {
    			...state
    		};
    		break;

    	case "declineInvitation":
  			for(let i=0; i < state.Invitation.length; ++i)
  			{
  				if(state.Invitation.From === action.from && state.Invitation.To === action.to)
  				{
  					state.Invitation.splice(i, 1);
  				}
  			}
  			break;

  		case "addInvitation":
  			let exist = false;
  			for(let i=0; i < state.Invitation.length; ++i)
  			{
  				if(state.Invitation[i].From === action.from && state.Invitation[i].To === action.to)
  				{
  					exist = true;
  					break;
  				}
  			}
  			if(!exist)
  			{
  				state.Invitation.push({From: action.from, To: action.to});
  			}
  			state = {
  				...state
  			};
  			break;

  		case "deleteMember":
  			for(let i=0; i < state.UserData.length; ++i)
  			{
    			if(state.UserData[i].Name === action.from)
    			{
      				if(state.UserData[i].Member.indexOf(action.to)  != -1)
      				{
        				state.UserData[i].Member.splice(state.UserData[i].Member.indexOf(action.to), 1);
      				}
    			}
    			else if(state.UserData[i].Name === action.to)
    			{
      				if(state.UserData[i].Member.indexOf(action.from)  != -1)
      				{
        				state.UserData[i].Member.splice(state.UserData[i].Member.indexOf(action.from), 1);
      				}
    			}
    			else
    			{
      				//dummy
    			}
  			}
  			state = {
  				...state
  			};
  			break;
  		default: 
  			state = {
  				...state
  			}
  			break;
	}
	return state;
};

const store = createStore(combineReducers({appReducer}), {}, applyMiddleWare(logger()));

