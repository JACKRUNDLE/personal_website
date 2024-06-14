import { useSaveUserSettingsContext, useUserContext, useUserSettingsContext, useEditModeContext } from "@/context/userContext";
import { useState , useEffect} from "react";
import { useSaveBlogPostContext, useDeleteBlogPostContext } from "@/context/userContext";



const Profile = () => {
    const user = useUserContext();
    const userSettings = useUserSettingsContext();
    const saveUserSettings = useSaveUserSettingsContext();
    const { editMode, setEditMode } = useEditModeContext();
    const [header, setHeader] = useState("");
    const [content, setContent] = useState("");
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
    const saveBlogPost = useSaveBlogPostContext();
    const deleteBlogPost = useDeleteBlogPostContext();
    const allowedEmail = "jackwrundle@gmail.com";

    useEffect(() => {
        if (userSettings != null) {
            setHeader(userSettings.header || '');
            setContent(userSettings.content || '');
        }
    }, [userSettings]);

    function handleCreatePost() {
        const newPostId = Date.now().toString();
        setSelectedPost({ id: newPostId, title: '', content: '' });
        setEditMode(true);
    }
    function handleEditPost(post: BlogPost) {
        setSelectedPost(post);
        setEditMode(true);
    }

    function handleDeletePost(postId: string) {
        if (deleteBlogPost != null) {
          deleteBlogPost(postId);
        }
      }

    function handleSavePost() {
        if (saveBlogPost != null && selectedPost != null) {
          saveBlogPost(selectedPost.id, selectedPost.title, selectedPost.content);
          setEditMode(false);
          setSelectedPost(null);
        }
      }

    function handleSaveUser() {
        if (saveUserSettings != null) {
            saveUserSettings(header, content);
            setEditMode(false);
        }
    }

    return (
        <div style={{ borderStyle: "solid", padding: 20, margin: 5 }}>
            {user ? (
                <img alt={user.displayName || ''} src={userSettings?.photoURL || ''} />
            ) : (
                <div />
            )}
            <p>Name: {user?.displayName}</p>
            <p>Email: {user?.email}</p>

            {user != null && user.email === allowedEmail && (
        <div>
          {editMode ? (
            <div>
              {selectedPost ? (
                <>
                  <input
                    type="text"
                    placeholder="Title"
                    value={selectedPost.title}
                    onChange={(e) =>
                      setSelectedPost({ ...selectedPost, title: e.target.value })
                    }
                  />
                  <br />
                  <textarea
                    placeholder="Content"
                    value={selectedPost.content}
                    onChange={(e) =>
                      setSelectedPost({ ...selectedPost, content: e.target.value })
                    }
                  />
                  <br />
                  <button onClick={handleSavePost}>Save Post</button>
                  <button onClick={() => setEditMode(false)}>Cancel</button>
                </>
              ) : (
                <>
                  <input
                    type="text"
                    placeholder="Header"
                    value={header}
                    onChange={(e) => setHeader(e.target.value)}
                  />
                  <br />
                  <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                  <br />
                  <button onClick={handleSaveUser}>Save</button>
                  <button onClick={() => setEditMode(false)}>Cancel</button>
                </>
              )}
            </div>
          ) : (
            <div>
              <button onClick={handleCreatePost}>Create New Post</button>
              {(userSettings?.blogPosts || []).map((post) => (
                <div key={post.id}>
                  <h3>{post.title}</h3>
                  <p>{post.content}</p>
                  <button onClick={() => handleEditPost(post)}>Edit</button>
                  <button onClick={() => handleDeletePost(post.id)}>Delete</button>
                </div>
              ))}
              {user != null && user.email !== allowedEmail && (
                <div>
                {(userSettings?.blogPosts || []).map((post) => (
                    <div key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                    </div>
                ))}
                </div>
            )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;