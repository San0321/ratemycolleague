import {createStore, combineReducers} from "redux";
import {logger} from "redux-logger";
import App from "./App";

const initialState = {
      Invitation: [{
        From: "A",
        To: "Rick"
      }],
      Message: [{
        From: "Morty",
        To: "Rick",
        Content: "Hello World"
      }],
      UserData: [{
        Name: "Rick",
        Id: "dorat",
        Password: "1234",
        Description: "Hi, my name is Rick. I have experience on web front-end development. I have used React.js and CSS to develop some websites.",
        Position: "",
        Endorsement: "",
        Evaluation: [],
        Picture: "./profile.png",
        Skill: ["React.js", "CSS"],
        Member: [],
        Email: "rick@ucsd.edu"
      },
      {
        Name: "Morty",
        Id: "something",
        Password: "1234",
        Description: "Hi, my name is Morty. I have experience on web back-end development. I have used Node.js and PHP to develop some websites.",
        Position: "",
        Evaluation: [],
        Endorsement: "",
        Picture: "",
        Skill: ["PHP", "Node.js"],
        Class: [],
        Email: "morty@ucsd.edu",
        Member: []
      },
      {
        Name: "Rick and Morty",
        Id: "rickmorty",
        Password: "1234",
        Description: "Hi, my name is Rick and Morty. I have experience on web back-end development. I have used Node.js and PHP to develop some websites.",
        Position: "",
        Endorsement: "",
        Evaluation: [],
        Picture: "./RM_profile.png",
        Skill: ["PHP", "Node.js"],
        Class: [],
        Email: "morty@ucsd.edu",
        Member: []
      },
      {
        Name: "Issac Chu",
        Id: "cse134",
        Password: "1234",
        Description: "Hello! I am Issac Chu",
        Position: "Professor",
        Endorsement: "",
        Evaluation: [],
        Picture: "",
        Skill: ["CSE134", "CSE141"],
        Class: [].
        Email: "ichu@ucsd.edu",
        Member: []
      }],
      Current: null, // Name
      Search:"",
      SearchItem:"",
      Searched: []
  }

export const appReducer = (state = initialState, action) => {
	switch (action.type){
    case "acceptEval":
      for(let i=0; i < state.UserData.length; ++i)
      {
        if(state.UserData[i].Name === action.to)
        {
          state.UserData[i].Evaluation.push(action.review);
          break;
        }
        if(state.UserData[i].Position === "Professor")
        {
          for(let j=0; j < state.UserData[i].Evaluation.length; ++j)
          {
            if(state.UserData[i].Evaluation[j].to === action.to && state.UserData[i].Evaluation[j].review === action.review)
            {
              state.UserData[i].Evaluation.splice(j, 1);
            }
          }
        }
      }
      state = {
        ...state
      };
      break;

    case "declineEval":
      for(let i=0; i < state.UserData.length; ++i)
      {
        if(state.UserData[i].Position === "Professor")
        {
          for(let j=0; j < state.UserData[i].Evaluation.length; ++j)
          {
            if(state.UserData[i].Evaluation[j].to === action.to && state.UserData[i].Evaluation[j].review === action.review)
            {
              state.UserData[i].Evaluation.splice(j, 1);
              break;
            }
          }
          break;
        }
      }
      state = {
        ...state
      };
      break;
      
		case "addEvaluation":
			for(let i=0; i < state.UserData.length; ++i)
      {
        if(state.UserData[i].Position === "Professor")
        {
          state.UserData[i].Evaluation.push({to: action.to, review: action.in_review});
        }
      }
      state = {
        ...state
      };
			break;

		case "replyMessage":
			state = {
				...state,
				Message: [...state.Message, 
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
  				Message: [...tempMessage]
  			};
  			break;

  		case "acceptInvitation":
  			let counter = 0;
        debugger;
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
        } 
        debugger; 

    		state = {
    			...state
    		};
    		break;

    	case "declineInvitation":
  			for(let i=0; i < state.Invitation.length; ++i)
  			{
  				if(state.Invitation[i].From === action.from && state.Invitation[i].To === action.to)
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
      case "SignUps":
        state.UserData.push(action.newObject);
        state = {
          ...state, 
        };
        break;

      case "LoggedIn":
        for(let a = 0; a < state.UserData.length; a++) {
          if(action.username === state.UserData[a].Id) {
            state = {
              ...state,
              Current: state.UserData[a].Name
            }
          }
        }
        break;

      case "Searching":

        state.Searched = [];
        state.Search = action.value;

        for(let a = 0; a < state.UserData.length; a++ ) {

          if(state.UserData[a].Name.toLowerCase() === action.value.toLowerCase()) {
            
              state.Searched.push(state.UserData[a])
            

          }
          
        }

        for(let b = 0; b < state.UserData.length; b++ ) {
           if(state.UserData[b].Name.toLowerCase().includes(action.value.toLowerCase()) && state.UserData[b].Name.toLowerCase() !== action.value.toLowerCase()) {
               state.Searched.push(state.UserData[b])
             
           }
         }
        state = {
          ...state
        };
        break;

      case "LogOut":

        state = {
          ...state,
          Current: null
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

export const store = createStore(combineReducers({appReducer}), {});