"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  CheckCircle2,
  Edit3,
  ExternalLink,
  Image as ImageIcon,
  Leaf,
  Loader2,
  LogOut,
  MessageCircle,
  Plus,
  RefreshCw,
  Save,
  Trash2,
  X,
} from "lucide-react";

interface Announcement {
  id: number;
  title: string;
  description: string | null;
  imageUrl: string;
  linkUrl: string | null;
  createdAt: string;
}

interface Comment {
  id: number;
  name: string;
  comment: string;
  status: string;
  created_at: string;
}

interface FormState {
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
}

interface CommentFormState {
  name: string;
  comment: string;
}

const emptyForm: FormState = {
  title: "",
  description: "",
  imageUrl: "",
  linkUrl: "",
};

const emptyCommentForm: CommentFormState = {
  name: "",
  comment: "",
};

export default function AdminDashboardPage() {
  const router = useRouter();

  const [announcements, setAnnouncements] = useState<
    Announcement[]
  >([]);

  const [comments, setComments] = useState<Comment[]>([]);

  const [loading, setLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(true);

  const [saving, setSaving] = useState(false);
  const [savingComment, setSavingComment] = useState(false);

  const [checking, setChecking] = useState(true);

  const [isFormOpen, setIsFormOpen] = useState(false);

  const [isCommentFormOpen, setIsCommentFormOpen] =
    useState(false);

  const [editingId, setEditingId] = useState<number | null>(
    null
  );

  /*
   * Instead of depending only on an ID,
   * keep the actual selected comment.
   * This prevents invalid/null ID problems.
   */
  const [selectedComment, setSelectedComment] =
    useState<Comment | null>(null);

  const [form, setForm] = useState<FormState>(emptyForm);

  const [commentForm, setCommentForm] =
    useState<CommentFormState>(
      emptyCommentForm
    );

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [deletingId, setDeletingId] =
    useState<number | null>(null);

  const [deletingCommentId, setDeletingCommentId] =
    useState<number | null>(null);

  const [loggingOut, setLoggingOut] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  /*
   * =========================================================
   * CHECK ADMIN SESSION
   * =========================================================
   */

  const checkSession = async () => {
    try {
      const response = await fetch("/api/admin", {
        method: "GET",
        cache: "no-store",
        credentials: "same-origin",
      });

      const data = await response.json();

      if (!data.loggedIn) {
        router.replace("/eco-admin");
        return false;
      }

      return true;
    } catch {
      router.replace("/eco-admin");
      return false;
    } finally {
      setChecking(false);
    }
  };

  /*
   * =========================================================
   * LOAD ANNOUNCEMENTS
   * =========================================================
   */

  const loadAnnouncements = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "/api/announcements",
        {
          method: "GET",
          cache: "no-store",
          credentials: "same-origin",
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        router.replace("/eco-admin");
        return;
      }

      if (!response.ok || !Array.isArray(data)) {
        throw new Error(
          data?.message ||
            "Failed to load announcements."
        );
      }

      setAnnouncements(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load announcements."
      );
    } finally {
      setLoading(false);
    }
  };

  /*
   * =========================================================
   * LOAD COMMENTS
   * =========================================================
   */

  const loadComments = async () => {
    try {
      setCommentsLoading(true);

      const response = await fetch(
        "/api/comments",
        {
          method: "GET",
          cache: "no-store",
          credentials: "same-origin",
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        router.replace("/eco-admin");
        return;
      }

      if (
        !response.ok ||
        !data.success ||
        !Array.isArray(data.comments)
      ) {
        throw new Error(
          data?.message ||
            "Failed to load comments."
        );
      }

      setComments(data.comments);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load comments."
      );
    } finally {
      setCommentsLoading(false);
    }
  };

  /*
   * =========================================================
   * INITIAL LOAD
   * =========================================================
   */

  useEffect(() => {
    const init = async () => {
      const authenticated =
        await checkSession();

      if (authenticated) {
        await Promise.all([
          loadAnnouncements(),
          loadComments(),
        ]);
      } else {
        setLoading(false);
        setCommentsLoading(false);
      }
    };

    init();
  }, []);

  /*
   * =========================================================
   * REFRESH
   * =========================================================
   */

  const handleRefresh = async () => {
    if (refreshing) return;

    setRefreshing(true);
    setError("");
    setMessage("");

    try {
      await Promise.all([
        loadAnnouncements(),
        loadComments(),
      ]);

      setMessage(
        "Dashboard refreshed."
      );
    } finally {
      setRefreshing(false);
    }
  };

  /*
   * =========================================================
   * ANNOUNCEMENT ADD
   * =========================================================
   */

  const openAddForm = () => {
    setEditingId(null);
    setForm(emptyForm);

    setError("");
    setMessage("");

    setIsFormOpen(true);
  };

  /*
   * =========================================================
   * ANNOUNCEMENT EDIT
   * =========================================================
   */

  const openEditForm = (
    announcement: Announcement
  ) => {
    setEditingId(announcement.id);

    setForm({
      title: announcement.title,
      description:
        announcement.description || "",
      imageUrl: announcement.imageUrl,
      linkUrl:
        announcement.linkUrl || "",
    });

    setError("");
    setMessage("");

    setIsFormOpen(true);
  };

  /*
   * =========================================================
   * ANNOUNCEMENT CLOSE
   * =========================================================
   */

  const closeForm = () => {
    if (saving) return;

    setIsFormOpen(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  /*
   * =========================================================
   * ANNOUNCEMENT CHANGE
   * =========================================================
   */

  const handleChange = (
    field: keyof FormState,
    value: string
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  /*
   * =========================================================
   * ANNOUNCEMENT SAVE
   * =========================================================
   */

  const handleSave = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setMessage("");
    setSaving(true);

    try {
      const method = editingId
        ? "PUT"
        : "POST";

      const body = editingId
        ? {
            id: editingId,
            ...form,
          }
        : {
            ...form,
          };

      const response = await fetch(
        "/api/announcements",
        {
          method,
          headers: {
            "Content-Type":
              "application/json",
          },
          credentials:
            "same-origin",
          body: JSON.stringify(
            body
          ),
        }
      );

      const data =
        await response.json();

      if (
        response.status ===
        401
      ) {
        router.replace(
          "/eco-admin"
        );
        return;
      }

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data?.message ||
            "Could not save announcement."
        );
      }

      setMessage(
        editingId
          ? "Announcement updated successfully."
          : "Announcement added successfully."
      );

      setIsFormOpen(false);
      setEditingId(null);
      setForm(emptyForm);

      await loadAnnouncements();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not save announcement."
      );
    } finally {
      setSaving(false);
    }
  };

  /*
   * =========================================================
   * ANNOUNCEMENT DELETE
   * =========================================================
   */

  const handleDelete = async (
    id: number
  ) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this announcement?"
      );

    if (!confirmed) {
      return;
    }

    setError("");
    setMessage("");
    setDeletingId(id);

    try {
      const response =
        await fetch(
          "/api/announcements",
          {
            method:
              "DELETE",
            headers: {
              "Content-Type":
                "application/json",
            },
            credentials:
              "same-origin",
            body:
              JSON.stringify({
                id,
              }),
          }
        );

      const data =
        await response.json();

      if (
        response.status ===
        401
      ) {
        router.replace(
          "/eco-admin"
        );
        return;
      }

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data?.message ||
            "Could not delete announcement."
        );
      }

      setMessage(
        "Announcement deleted successfully."
      );

      await loadAnnouncements();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not delete announcement."
      );
    } finally {
      setDeletingId(null);
    }
  };

  /*
   * =========================================================
   * COMMENT ADD
   * =========================================================
   */

  const openAddCommentForm =
    () => {
      setSelectedComment(
        null
      );

      setCommentForm(
        emptyCommentForm
      );

      setError("");
      setMessage("");

      setIsCommentFormOpen(
        true
      );
    };

  /*
   * =========================================================
   * COMMENT EDIT
   * =========================================================
   */

  const openEditCommentForm =
    (comment: Comment) => {
      /*
       * Keep the full object.
       * This guarantees the real DB ID
       * stays attached to the edit action.
       */
      setSelectedComment(
        comment
      );

      setCommentForm({
        name: comment.name,
        comment:
          comment.comment,
      });

      setError("");
      setMessage("");

      setIsCommentFormOpen(
        true
      );
    };

  /*
   * =========================================================
   * COMMENT CLOSE
   * =========================================================
   */

  const closeCommentForm =
    () => {
      if (
        savingComment
      ) {
        return;
      }

      setIsCommentFormOpen(
        false
      );

      setSelectedComment(
        null
      );

      setCommentForm(
        emptyCommentForm
      );

      setError("");
    };

  /*
   * =========================================================
   * COMMENT CHANGE
   * =========================================================
   */

  const handleCommentChange = (
    field: keyof CommentFormState,
    value: string
  ) => {
    setCommentForm(
      (previous) => ({
        ...previous,
        [field]: value,
      })
    );
  };

  /*
   * =========================================================
   * COMMENT SAVE
   *
   * ADD = POST
   * EDIT = PUT
   * =========================================================
   */

  const handleCommentSave =
    async (
      event: FormEvent<HTMLFormElement>
    ) => {
      event.preventDefault();

      setError("");
      setMessage("");
      setSavingComment(
        true
      );

      try {
        const name =
          commentForm.name.trim();

        const comment =
          commentForm.comment.trim();

        if (!name) {
          throw new Error(
            "Name is required."
          );
        }

        if (!comment) {
          throw new Error(
            "Comment is required."
          );
        }

        /*
         * ===================================================
         * ADD NEW COMMENT
         * ===================================================
         */

        if (!selectedComment) {
          const response =
            await fetch(
              "/api/comments",
              {
                method: "POST",
                headers: {
                  "Content-Type":
                    "application/json",
                },
                credentials:
                  "same-origin",
                body:
                  JSON.stringify({
                    name,
                    comment,
                  }),
              }
            );

          const data =
            await response.json();

          if (
            response.status ===
            401
          ) {
            router.replace(
              "/eco-admin"
            );
            return;
          }

          if (
            !response.ok ||
            !data.success
          ) {
            throw new Error(
              data?.message ||
                "Could not add comment."
            );
          }

          setMessage(
            "Comment added successfully."
          );

          setIsCommentFormOpen(
            false
          );

          setSelectedComment(
            null
          );

          setCommentForm(
            emptyCommentForm
          );

          await loadComments();

          return;
        }

        /*
         * ===================================================
         * EDIT EXISTING COMMENT
         * ===================================================
         */

        const commentId =
          Number(
            selectedComment.id
          );

        /*
         * Extra protection.
         */
        if (
          !Number.isInteger(
            commentId
          ) ||
          commentId <= 0
        ) {
          throw new Error(
            "Invalid comment ID."
          );
        }

        const response =
          await fetch(
            "/api/comments",
            {
              method: "PUT",
              headers: {
                "Content-Type":
                  "application/json",
              },
              credentials:
                "same-origin",
              body:
                JSON.stringify({
                  id: commentId,
                  name,
                  comment,
                }),
            }
          );

        const data =
          await response.json();

        if (
          response.status ===
          401
        ) {
          router.replace(
            "/eco-admin"
          );
          return;
        }

        if (
          !response.ok ||
          !data.success
        ) {
          throw new Error(
            data?.message ||
              "Could not update comment."
          );
        }

        setMessage(
          "Comment updated successfully."
        );

        setIsCommentFormOpen(
          false
        );

        setSelectedComment(
          null
        );

        setCommentForm(
          emptyCommentForm
        );

        await loadComments();
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Could not save comment."
        );
      } finally {
        setSavingComment(
          false
        );
      }
    };

  /*
   * =========================================================
   * COMMENT DELETE
   * =========================================================
   */

  const handleDeleteComment =
    async (
      id: number
    ) => {
      const commentId =
        Number(id);

      if (
        !Number.isInteger(
          commentId
        ) ||
        commentId <= 0
      ) {
        setError(
          "Invalid comment ID."
        );
        return;
      }

      const confirmed =
        window.confirm(
          "Are you sure you want to permanently delete this comment?"
        );

      if (!confirmed) {
        return;
      }

      setError("");
      setMessage("");
      setDeletingCommentId(
        commentId
      );

      try {
        const response =
          await fetch(
            `/api/comments?id=${commentId}`,
            {
              method:
                "DELETE",
              credentials:
                "same-origin",
            }
          );

        const data =
          await response.json();

        if (
          response.status ===
          401
        ) {
          router.replace(
            "/eco-admin"
          );
          return;
        }

        if (
          !response.ok ||
          !data.success
        ) {
          throw new Error(
            data?.message ||
              "Could not delete comment."
          );
        }

        setMessage(
          "Comment deleted successfully."
        );

        /*
         * If currently editing the
         * deleted comment, close modal.
         */
        if (
          selectedComment?.id ===
          commentId
        ) {
          setIsCommentFormOpen(
            false
          );

          setSelectedComment(
            null
          );

          setCommentForm(
            emptyCommentForm
          );
        }

        await loadComments();
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Could not delete comment."
        );
      } finally {
        setDeletingCommentId(
          null
        );
      }
    };

  /*
   * =========================================================
   * LOGOUT
   * =========================================================
   */

  const handleLogout =
    async () => {
      if (loggingOut) return;

      setLoggingOut(true);

      try {
        await fetch(
          "/api/admin",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            credentials:
              "same-origin",
            body:
              JSON.stringify({
                action:
                  "logout",
              }),
          }
        );
      } catch {
        // Continue to login.
      } finally {
        router.replace(
          "/eco-admin"
        );

        router.refresh();
      }
    };

  /*
   * =========================================================
   * SESSION CHECK
   * =========================================================
   */

  if (checking) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4">
          <Loader2
            size={32}
            className="animate-spin text-emerald-400"
          />

          <p className="text-sm text-slate-400">
            Checking admin session...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-500/10">
                <Leaf
                  size={24}
                  className="text-emerald-400"
                />
              </div>

              <div className="min-w-0">
                <h1 className="truncate text-lg font-black sm:text-xl">
                  සොබා සේනාංකය
                </h1>

                <p className="truncate text-xs text-slate-500">
                  Admin Dashboard
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={
                  handleRefresh
                }
                disabled={
                  refreshing
                }
                title="Refresh"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 disabled:opacity-50"
              >
                <RefreshCw
                  size={17}
                  className={
                    refreshing
                      ? "animate-spin"
                      : ""
                  }
                />
              </button>

              <button
                type="button"
                onClick={
                  handleLogout
                }
                disabled={
                  loggingOut
                }
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-white/10 disabled:opacity-50 sm:px-4"
              >
                {loggingOut ? (
                  <Loader2
                    size={
                      17
                    }
                    className="animate-spin"
                  />
                ) : (
                  <LogOut
                    size={
                      17
                    }
                  />
                )}

                <span className="hidden sm:inline">
                  Logout
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* =====================================================
          MAIN
      ====================================================== */}

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        {/* STATS */}
        <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Announcements */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Announcements
                </p>

                <p className="mt-2 text-3xl font-black">
                  {
                    announcements.length
                  }
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10">
                <Bell
                  size={23}
                  className="text-emerald-400"
                />
              </div>
            </div>
          </div>

          {/* Comments */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Ideas & Suggestions
                </p>

                <p className="mt-2 text-3xl font-black">
                  {
                    comments.length
                  }
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/10">
                <MessageCircle
                  size={23}
                  className="text-sky-400"
                />
              </div>
            </div>
          </div>

          {/* System */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  System
                </p>

                <p className="mt-2 text-lg font-black text-emerald-400">
                  Online
                </p>
              </div>

              <CheckCircle2
                size={29}
                className="text-emerald-400"
              />
            </div>
          </div>
        </section>

        {/* MESSAGES */}

        {message && (
          <div className="mb-5 flex items-start gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
            <CheckCircle2
              size={18}
              className="mt-0.5 shrink-0"
            />

            <span>
              {message}
            </span>
          </div>
        )}

        {error && (
          <div className="mb-5 rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        {/* =====================================================
            ANNOUNCEMENTS
        ====================================================== */}

        <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035]">
          <div className="border-b border-white/10 p-5 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-black sm:text-2xl">
                  නවතම නිවේදන
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Add, edit and manage website announcements.
                </p>
              </div>

              <button
                type="button"
                onClick={
                  openAddForm
                }
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-400 sm:w-auto"
              >
                <Plus
                  size={19}
                />

                Add Announcement
              </button>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            {loading ? (
              <div className="flex flex-col items-center gap-4 py-16 text-slate-500">
                <Loader2
                  size={30}
                  className="animate-spin text-emerald-400"
                />

                <p className="text-sm">
                  Loading announcements...
                </p>
              </div>
            ) : announcements.length ===
              0 ? (
              <div className="flex flex-col items-center py-16 text-center">
                <Bell
                  size={27}
                  className="mb-4 text-slate-500"
                />

                <h3 className="text-lg font-bold">
                  No announcements yet
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Add your first announcement.
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {announcements.map(
                  (
                    announcement
                  ) => (
                    <article
                      key={
                        announcement.id
                      }
                      className="overflow-hidden rounded-3xl border border-white/10 bg-black/10"
                    >
                      <div className="flex flex-col md:flex-row">
                        <div className="aspect-video bg-white/5 md:w-56 md:shrink-0 md:aspect-auto">
                          <img
                            src={
                              announcement.imageUrl
                            }
                            alt={
                              announcement.title
                            }
                            className="h-full w-full object-cover"
                            onError={(
                              event
                            ) => {
                              event.currentTarget.style.display =
                                "none";
                            }}
                          />
                        </div>

                        <div className="flex-1 p-5">
                          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                            <div className="min-w-0">
                              <h3 className="break-words text-lg font-black">
                                {
                                  announcement.title
                                }
                              </h3>

                              {announcement.description && (
                                <p className="mt-2 break-words text-sm leading-6 text-slate-400">
                                  {
                                    announcement.description
                                  }
                                </p>
                              )}

                              {announcement.linkUrl && (
                                <a
                                  href={
                                    announcement.linkUrl
                                  }
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="mt-3 inline-flex items-center gap-1.5 break-all text-xs font-semibold text-emerald-400"
                                >
                                  <ExternalLink
                                    size={
                                      14
                                    }
                                  />

                                  Open link
                                </a>
                              )}

                              <p className="mt-3 text-[11px] text-slate-600">
                                ID #
                                {
                                  announcement.id
                                }{" "}
                                ·{" "}
                                {
                                  announcement.createdAt
                                }
                              </p>
                            </div>

                            <div className="flex shrink-0 items-center gap-2">
                              <button
                                type="button"
                                onClick={() =>
                                  openEditForm(
                                    announcement
                                  )
                                }
                                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold transition hover:bg-white/10"
                              >
                                <Edit3
                                  size={
                                    16
                                  }
                                />

                                Edit
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  handleDelete(
                                    announcement.id
                                  )
                                }
                                disabled={
                                  deletingId ===
                                  announcement.id
                                }
                                className="inline-flex items-center gap-2 rounded-xl border border-red-400/10 bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-red-300 transition hover:bg-red-500/15 disabled:opacity-50"
                              >
                                {deletingId ===
                                announcement.id ? (
                                  <Loader2
                                    size={
                                      16
                                    }
                                    className="animate-spin"
                                  />
                                ) : (
                                  <Trash2
                                    size={
                                      16
                                    }
                                  />
                                )}

                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  )
                )}
              </div>
            )}
          </div>
        </section>

        {/* =====================================================
            COMMENTS
        ====================================================== */}

        <section className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035]">
          <div className="border-b border-white/10 p-5 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sky-500/10">
                  <MessageCircle
                    size={22}
                    className="text-sky-400"
                  />
                </div>

                <div>
                  <h2 className="text-xl font-black sm:text-2xl">
                    අදහස් හා යෝජනා
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Manage live ideas and suggestions.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={
                  openAddCommentForm
                }
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-sky-500 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-sky-400 sm:w-auto"
              >
                <Plus
                  size={19}
                />

                Add Comment
              </button>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            {commentsLoading ? (
              <div className="flex flex-col items-center gap-4 py-16 text-slate-500">
                <Loader2
                  size={30}
                  className="animate-spin text-sky-400"
                />

                <p className="text-sm">
                  Loading comments...
                </p>
              </div>
            ) : comments.length ===
              0 ? (
              <div className="flex flex-col items-center py-16 text-center">
                <MessageCircle
                  size={27}
                  className="mb-4 text-slate-500"
                />

                <h3 className="text-lg font-bold">
                  No comments yet
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Ideas and suggestions will appear here.
                </p>
              </div>
            ) : (
              <div className="grid gap-3">
                {comments.map(
                  (
                    comment
                  ) => (
                    <article
                      key={
                        comment.id
                      }
                      className="rounded-3xl border border-white/10 bg-black/10 p-4 sm:p-5"
                    >
                      <div className="flex flex-col gap-4">
                        <div>
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-500/10">
                              <MessageCircle
                                size={
                                  17
                                }
                                className="text-sky-400"
                              />
                            </div>

                            <div className="min-w-0">
                              <h3 className="break-words text-sm font-bold sm:text-base">
                                {
                                  comment.name
                                }
                              </h3>

                              <p className="text-[10px] text-slate-600">
                                ID #
                                {
                                  comment.id
                                }{" "}
                                ·{" "}
                                {
                                  comment.created_at
                                }
                              </p>
                            </div>
                          </div>

                          <div className="mt-4 rounded-2xl border border-white/5 bg-white/[0.025] px-4 py-3">
                            <p className="break-words whitespace-pre-wrap text-sm leading-7 text-slate-300">
                              {
                                comment.comment
                              }
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              openEditCommentForm(
                                comment
                              )
                            }
                            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold transition hover:bg-white/10 sm:flex-none"
                          >
                            <Edit3
                              size={
                                16
                              }
                            />

                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleDeleteComment(
                                comment.id
                              )
                            }
                            disabled={
                              deletingCommentId ===
                              comment.id
                            }
                            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-red-400/10 bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-red-300 transition hover:bg-red-500/15 disabled:opacity-50 sm:flex-none"
                          >
                            {deletingCommentId ===
                            comment.id ? (
                              <Loader2
                                size={
                                  16
                                }
                                className="animate-spin"
                              />
                            ) : (
                              <Trash2
                                size={
                                  16
                                }
                              />
                            )}

                            Delete
                          </button>
                        </div>
                      </div>
                    </article>
                  )
                )}
              </div>
            )}
          </div>
        </section>
      </div>

      {/* =====================================================
          ANNOUNCEMENT MODAL
      ====================================================== */}

      {isFormOpen && (
        <div className="fixed inset-0 z-[100] overflow-y-auto bg-black/70 p-4 backdrop-blur-sm">
          <div className="flex min-h-full items-center justify-center py-6">
            <div className="w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-slate-950 shadow-2xl">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-5 sm:px-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10">
                    {editingId ? (
                      <Edit3
                        size={
                          21
                        }
                        className="text-emerald-400"
                      />
                    ) : (
                      <Plus
                        size={
                          21
                        }
                        className="text-emerald-400"
                      />
                    )}
                  </div>

                  <div>
                    <h2 className="text-lg font-black">
                      {editingId
                        ? "Edit Announcement"
                        : "Add Announcement"}
                    </h2>

                    <p className="text-xs text-slate-500">
                      Website announcement content
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={
                    closeForm
                  }
                  disabled={
                    saving
                  }
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 transition hover:bg-white/10 disabled:opacity-50"
                >
                  <X size={19} />
                </button>
              </div>

              <form
                onSubmit={
                  handleSave
                }
                className="space-y-5 p-5 sm:p-6"
              >
                <div>
                  <label
                    htmlFor="announcement-title"
                    className="mb-2 block text-sm font-semibold text-slate-300"
                  >
                    Title
                  </label>

                  <input
                    id="announcement-title"
                    type="text"
                    value={
                      form.title
                    }
                    onChange={(
                      event
                    ) =>
                      handleChange(
                        "title",
                        event
                          .target
                          .value
                      )
                    }
                    required
                    disabled={
                      saving
                    }
                    className="h-12 w-full rounded-2xl border border-white/10 bg-black/20 px-4 text-white outline-none focus:border-emerald-400/60 disabled:opacity-50"
                  />
                </div>

                <div>
                  <label
                    htmlFor="announcement-description"
                    className="mb-2 block text-sm font-semibold text-slate-300"
                  >
                    Description
                  </label>

                  <textarea
                    id="announcement-description"
                    value={
                      form.description
                    }
                    onChange={(
                      event
                    ) =>
                      handleChange(
                        "description",
                        event
                          .target
                          .value
                      )
                    }
                    rows={4}
                    disabled={
                      saving
                    }
                    className="w-full resize-none rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-emerald-400/60 disabled:opacity-50"
                  />
                </div>

                <div>
                  <label
                    htmlFor="announcement-image"
                    className="mb-2 block text-sm font-semibold text-slate-300"
                  >
                    Image URL
                  </label>

                  <div className="relative">
                    <ImageIcon
                      size={
                        18
                      }
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                    />

                    <input
                      id="announcement-image"
                      type="url"
                      value={
                        form.imageUrl
                      }
                      onChange={(
                        event
                      ) =>
                        handleChange(
                          "imageUrl",
                          event
                            .target
                            .value
                        )
                      }
                      required
                      disabled={
                        saving
                      }
                      className="h-12 w-full rounded-2xl border border-white/10 bg-black/20 pl-11 pr-4 text-white outline-none focus:border-emerald-400/60 disabled:opacity-50"
                    />
                  </div>

                  {form.imageUrl && (
                    <div className="mt-3 h-40 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                      <img
                        src={
                          form.imageUrl
                        }
                        alt="Preview"
                        className="h-full w-full object-cover"
                        onError={(
                          event
                        ) => {
                          event.currentTarget.style.display =
                            "none";
                        }}
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="announcement-link"
                    className="mb-2 block text-sm font-semibold text-slate-300"
                  >
                    Link URL
                    <span className="ml-2 text-xs font-normal text-slate-600">
                      Optional
                    </span>
                  </label>

                  <div className="relative">
                    <ExternalLink
                      size={
                        18
                      }
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                    />

                    <input
                      id="announcement-link"
                      type="url"
                      value={
                        form.linkUrl
                      }
                      onChange={(
                        event
                      ) =>
                        handleChange(
                          "linkUrl",
                          event
                            .target
                            .value
                        )
                      }
                      disabled={
                        saving
                      }
                      className="h-12 w-full rounded-2xl border border-white/10 bg-black/20 pl-11 pr-4 text-white outline-none focus:border-emerald-400/60 disabled:opacity-50"
                    />
                  </div>
                </div>

                {error && (
                  <div className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                    {
                      error
                    }
                  </div>
                )}

                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={
                      closeForm
                    }
                    disabled={
                      saving
                    }
                    className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold transition hover:bg-white/10 disabled:opacity-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={
                      saving
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-400 disabled:opacity-60"
                  >
                    {saving ? (
                      <>
                        <Loader2
                          size={
                            18
                          }
                          className="animate-spin"
                        />

                        Saving...
                      </>
                    ) : (
                      <>
                        <Save
                          size={
                            18
                          }
                        />

                        {editingId
                          ? "Save Changes"
                          : "Add Announcement"}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          COMMENT ADD / EDIT MODAL
      ====================================================== */}

      {isCommentFormOpen && (
        <div className="fixed inset-0 z-[110] overflow-y-auto bg-black/70 p-4 backdrop-blur-sm">
          <div className="flex min-h-full items-center justify-center py-6">
            <div className="w-full max-w-xl overflow-hidden rounded-3xl border border-white/10 bg-slate-950 shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-5 sm:px-6">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sky-500/10">
                    {selectedComment ? (
                      <Edit3
                        size={
                          21
                        }
                        className="text-sky-400"
                      />
                    ) : (
                      <Plus
                        size={
                          21
                        }
                        className="text-sky-400"
                      />
                    )}
                  </div>

                  <div className="min-w-0">
                    <h2 className="truncate text-lg font-black">
                      {selectedComment
                        ? "Edit Comment"
                        : "Add Comment"}
                    </h2>

                    <p className="text-xs text-slate-500">
                      {selectedComment
                        ? `Editing comment #${selectedComment.id}`
                        : "Add a live comment"}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={
                    closeCommentForm
                  }
                  disabled={
                    savingComment
                  }
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 transition hover:bg-white/10 disabled:opacity-50"
                >
                  <X size={19} />
                </button>
              </div>

              {/* Form */}
              <form
                onSubmit={
                  handleCommentSave
                }
                className="space-y-5 p-5 sm:p-6"
              >
                {/* Name */}
                <div>
                  <label
                    htmlFor="admin-comment-name"
                    className="mb-2 block text-sm font-semibold text-slate-300"
                  >
                    Name
                  </label>

                  <input
                    id="admin-comment-name"
                    type="text"
                    maxLength={
                      80
                    }
                    value={
                      commentForm.name
                    }
                    onChange={(
                      event
                    ) =>
                      handleCommentChange(
                        "name",
                        event
                          .target
                          .value
                      )
                    }
                    placeholder="Name"
                    required
                    disabled={
                      savingComment
                    }
                    className="h-12 w-full rounded-2xl border border-white/10 bg-black/20 px-4 text-white outline-none placeholder:text-slate-600 focus:border-sky-400/60 disabled:opacity-50"
                  />
                </div>

                {/* Comment */}
                <div>
                  <label
                    htmlFor="admin-comment-text"
                    className="mb-2 block text-sm font-semibold text-slate-300"
                  >
                    Comment
                  </label>

                  <textarea
                    id="admin-comment-text"
                    maxLength={
                      1000
                    }
                    rows={
                      6
                    }
                    value={
                      commentForm.comment
                    }
                    onChange={(
                      event
                    ) =>
                      handleCommentChange(
                        "comment",
                        event
                          .target
                          .value
                      )
                    }
                    placeholder="Comment"
                    required
                    disabled={
                      savingComment
                    }
                    className="w-full resize-none rounded-2xl border border-white/10 bg-black/20 px-4 py-3 leading-7 text-white outline-none placeholder:text-slate-600 focus:border-sky-400/60 disabled:opacity-50"
                  />
                </div>

                {error && (
                  <div className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm leading-6 text-red-300">
                    {
                      error
                    }
                  </div>
                )}

                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={
                      closeCommentForm
                    }
                    disabled={
                      savingComment
                    }
                    className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold transition hover:bg-white/10 disabled:opacity-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={
                      savingComment
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-500 px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-sky-400 disabled:opacity-60"
                  >
                    {savingComment ? (
                      <>
                        <Loader2
                          size={
                            18
                          }
                          className="animate-spin"
                        />

                        Saving...
                      </>
                    ) : (
                      <>
                        <Save
                          size={
                            18
                          }
                        />

                        {selectedComment
                          ? "Save Changes"
                          : "Add Comment"}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </main>
  );
        }
