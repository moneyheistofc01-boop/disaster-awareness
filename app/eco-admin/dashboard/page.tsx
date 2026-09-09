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
  const [commentsLoading, setCommentsLoading] =
    useState(true);

  const [saving, setSaving] = useState(false);
  const [savingComment, setSavingComment] =
    useState(false);

  const [checking, setChecking] = useState(true);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isCommentFormOpen, setIsCommentFormOpen] =
    useState(false);

  const [editingId, setEditingId] = useState<number | null>(
    null
  );

  const [editingCommentId, setEditingCommentId] =
    useState<number | null>(null);

  const [form, setForm] =
    useState<FormState>(emptyForm);

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

  const [loggingOut, setLoggingOut] =
    useState(false);

  const [refreshing, setRefreshing] =
    useState(false);

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
   * REFRESH ALL
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

      setMessage("Dashboard refreshed.");
    } finally {
      setRefreshing(false);
    }
  };

  /*
   * =========================================================
   * ANNOUNCEMENT - ADD
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
   * ANNOUNCEMENT - EDIT
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
      linkUrl: announcement.linkUrl || "",
    });

    setError("");
    setMessage("");

    setIsFormOpen(true);
  };

  /*
   * =========================================================
   * ANNOUNCEMENT - CLOSE
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
   * ANNOUNCEMENT - CHANGE
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
   * ANNOUNCEMENT - SAVE
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
            "Content-Type": "application/json",
          },
          credentials: "same-origin",
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        router.replace("/eco-admin");
        return;
      }

      if (!response.ok || !data.success) {
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
   * ANNOUNCEMENT - DELETE
   * =========================================================
   */

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this announcement?"
    );

    if (!confirmed) return;

    setError("");
    setMessage("");
    setDeletingId(id);

    try {
      const response = await fetch(
        "/api/announcements",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "same-origin",
          body: JSON.stringify({
            id,
          }),
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        router.replace("/eco-admin");
        return;
      }

      if (!response.ok || !data.success) {
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
   * COMMENT - ADD FORM
   * =========================================================
   */

  const openAddCommentForm = () => {
    setEditingCommentId(null);

    setCommentForm(
      emptyCommentForm
    );

    setError("");
    setMessage("");

    setIsCommentFormOpen(true);
  };

  /*
   * =========================================================
   * COMMENT - EDIT FORM
   * =========================================================
   */

  const openEditCommentForm = (
    comment: Comment
  ) => {
    setEditingCommentId(comment.id);

    setCommentForm({
      name: comment.name,
      comment: comment.comment,
    });

    setError("");
    setMessage("");

    setIsCommentFormOpen(true);
  };

  /*
   * =========================================================
   * COMMENT - CLOSE FORM
   * =========================================================
   */

  const closeCommentForm = () => {
    if (savingComment) return;

    setIsCommentFormOpen(false);
    setEditingCommentId(null);
    setCommentForm(
      emptyCommentForm
    );
  };

  /*
   * =========================================================
   * COMMENT - CHANGE
   * =========================================================
   */

  const handleCommentChange = (
    field: keyof CommentFormState,
    value: string
  ) => {
    setCommentForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  /*
   * =========================================================
   * COMMENT - SAVE
   * =========================================================
   */

  const handleCommentSave = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setMessage("");
    setSavingComment(true);

    try {
      const response = await fetch(
        "/api/comments",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "same-origin",
          body: JSON.stringify({
            id: editingCommentId,
            name: commentForm.name,
            comment: commentForm.comment,
          }),
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        router.replace("/eco-admin");
        return;
      }

      if (!response.ok || !data.success) {
        throw new Error(
          data?.message ||
            "Could not update comment."
        );
      }

      setMessage(
        "Comment updated successfully."
      );

      setIsCommentFormOpen(false);
      setEditingCommentId(null);
      setCommentForm(
        emptyCommentForm
      );

      await loadComments();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not update comment."
      );
    } finally {
      setSavingComment(false);
    }
  };

  /*
   * =========================================================
   * COMMENT - DELETE
   * =========================================================
   */

  const handleDeleteComment = async (
    id: number
  ) => {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this comment?"
    );

    if (!confirmed) return;

    setError("");
    setMessage("");
    setDeletingCommentId(id);

    try {
      const response = await fetch(
        `/api/comments?id=${id}`,
        {
          method: "DELETE",
          credentials: "same-origin",
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        router.replace("/eco-admin");
        return;
      }

      if (!response.ok || !data.success) {
        throw new Error(
          data?.message ||
            "Could not delete comment."
        );
      }

      setMessage(
        "Comment deleted successfully."
      );

      await loadComments();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not delete comment."
      );
    } finally {
      setDeletingCommentId(null);
    }
  };

  /*
   * =========================================================
   * LOGOUT
   * =========================================================
   */

  const handleLogout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);

    try {
      await fetch("/api/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
        body: JSON.stringify({
          action: "logout",
        }),
      });
    } catch {
      // Continue to login page.
    } finally {
      router.replace("/eco-admin");
      router.refresh();
    }
  };

  /*
   * =========================================================
   * SESSION CHECKING
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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Brand */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-11 h-11 shrink-0 rounded-2xl bg-emerald-500/10 border border-emerald-400/20 flex items-center justify-center">
                <Leaf
                  size={24}
                  className="text-emerald-400"
                />
              </div>

              <div className="min-w-0">
                <h1 className="font-black text-lg sm:text-xl truncate">
                  සොබා සේනාංකය
                </h1>

                <p className="text-xs text-slate-500 truncate">
                  Admin Dashboard
                </p>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleRefresh}
                disabled={refreshing}
                title="Refresh"
                className="w-10 h-10 inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 transition disabled:opacity-50"
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
                onClick={handleLogout}
                disabled={loggingOut}
                className="shrink-0 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 sm:px-4 py-2.5 text-sm font-semibold text-slate-300 hover:bg-white/10 transition disabled:opacity-50"
              >
                {loggingOut ? (
                  <Loader2
                    size={17}
                    className="animate-spin"
                  />
                ) : (
                  <LogOut size={17} />
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

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-8">
        {/* =================================================
            STATS
        ================================================== */}

        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {/* Announcements */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Announcements
                </p>

                <p className="mt-2 text-3xl font-black">
                  {announcements.length}
                </p>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
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
                  {comments.length}
                </p>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 flex items-center justify-center">
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

        {/* =================================================
            GLOBAL MESSAGES
        ================================================== */}

        {message && (
          <div className="mb-5 flex items-start gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
            <CheckCircle2
              size={18}
              className="mt-0.5 shrink-0"
            />

            <span>{message}</span>
          </div>
        )}

        {error && (
          <div className="mb-5 rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        {/* =================================================
            ANNOUNCEMENTS
        ================================================== */}

        <section className="rounded-3xl border border-white/10 bg-white/[0.035] overflow-hidden">
          {/* Section Header */}
          <div className="p-5 sm:p-6 border-b border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black">
                  නවතම නිවේදන
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Add, edit and manage website
                  announcements.
                </p>
              </div>

              <button
                type="button"
                onClick={openAddForm}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-black text-slate-950 hover:bg-emerald-400 active:scale-[0.98] transition"
              >
                <Plus size={19} />

                Add Announcement
              </button>
            </div>
          </div>

          {/* Announcement List */}
          <div className="p-4 sm:p-6">
            {loading ? (
              <div className="py-16 flex flex-col items-center gap-4 text-slate-500">
                <Loader2
                  size={30}
                  className="animate-spin text-emerald-400"
                />

                <p className="text-sm">
                  Loading announcements...
                </p>
              </div>
            ) : announcements.length === 0 ? (
              <div className="py-16 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center mb-4">
                  <Bell
                    size={27}
                    className="text-slate-500"
                  />
                </div>

                <h3 className="font-bold text-lg">
                  No announcements yet
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Add your first announcement.
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {announcements.map(
                  (announcement) => (
                    <article
                      key={announcement.id}
                      className="overflow-hidden rounded-3xl border border-white/10 bg-black/10"
                    >
                      <div className="flex flex-col md:flex-row">
                        {/* Image */}
                        <div className="md:w-56 md:shrink-0 aspect-video md:aspect-auto bg-white/5">
                          <img
                            src={
                              announcement.imageUrl
                            }
                            alt={
                              announcement.title
                            }
                            className="w-full h-full object-cover"
                            onError={(event) => {
                              event.currentTarget.style.display =
                                "none";
                            }}
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-5">
                          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                            <div className="min-w-0">
                              <h3 className="text-lg font-black break-words">
                                {
                                  announcement.title
                                }
                              </h3>

                              {announcement.description && (
                                <p className="mt-2 text-sm leading-6 text-slate-400 break-words">
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
                                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 break-all"
                                >
                                  <ExternalLink
                                    size={14}
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

                            {/* Actions */}
                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                type="button"
                                onClick={() =>
                                  openEditForm(
                                    announcement
                                  )
                                }
                                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold hover:bg-white/10 transition"
                              >
                                <Edit3 size={16} />

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
                                className="inline-flex items-center gap-2 rounded-xl border border-red-400/10 bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-red-300 hover:bg-red-500/15 transition disabled:opacity-50"
                              >
                                {deletingId ===
                                announcement.id ? (
                                  <Loader2
                                    size={16}
                                    className="animate-spin"
                                  />
                                ) : (
                                  <Trash2 size={16} />
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

        {/* =================================================
            COMMENTS
        ================================================== */}

        <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.035] overflow-hidden">
          {/* Section Header */}
          <div className="p-5 sm:p-6 border-b border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-sky-500/10 flex items-center justify-center">
                    <MessageCircle
                      size={22}
                      className="text-sky-400"
                    />
                  </div>

                  <div>
                    <h2 className="text-xl sm:text-2xl font-black">
                      අදහස් හා යෝජනා
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Manage live ideas and suggestions.
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={openAddCommentForm}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-500 px-5 py-3 text-sm font-black text-slate-950 hover:bg-sky-400 active:scale-[0.98] transition"
              >
                <Plus size={19} />

                Add Comment
              </button>
            </div>
          </div>

          {/* Comment List */}
          <div className="p-4 sm:p-6">
            {commentsLoading ? (
              <div className="py-16 flex flex-col items-center gap-4 text-slate-500">
                <Loader2
                  size={30}
                  className="animate-spin text-sky-400"
                />

                <p className="text-sm">
                  Loading comments...
                </p>
              </div>
            ) : comments.length === 0 ? (
              <div className="py-16 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center mb-4">
                  <MessageCircle
                    size={27}
                    className="text-slate-500"
                  />
                </div>

                <h3 className="font-bold text-lg">
                  No comments yet
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Ideas and suggestions will appear here.
                </p>
              </div>
            ) : (
              <div className="grid gap-3">
                {comments.map((comment) => (
                  <article
                    key={comment.id}
                    className="rounded-3xl border border-white/10 bg-black/10 p-4 sm:p-5"
                  >
                    <div className="flex flex-col gap-4">
                      {/* Comment Content */}
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <div className="w-9 h-9 rounded-full bg-sky-500/10 flex items-center justify-center shrink-0">
                            <MessageCircle
                              size={17}
                              className="text-sky-400"
                            />
                          </div>

                          <div className="min-w-0">
                            <h3 className="font-bold text-sm sm:text-base break-words">
                              {comment.name}
                            </h3>

                            <p className="text-[10px] text-slate-600">
                              ID #{comment.id} ·{" "}
                              {comment.created_at}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 rounded-2xl border border-white/5 bg-white/[0.025] px-4 py-3">
                          <p className="text-sm leading-6 text-slate-300 whitespace-pre-wrap break-words">
                            {comment.comment}
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            openEditCommentForm(
                              comment
                            )
                          }
                          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold hover:bg-white/10 transition"
                        >
                          <Edit3 size={16} />

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
                          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl border border-red-400/10 bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-red-300 hover:bg-red-500/15 transition disabled:opacity-50"
                        >
                          {deletingCommentId ===
                          comment.id ? (
                            <Loader2
                              size={16}
                              className="animate-spin"
                            />
                          ) : (
                            <Trash2 size={16} />
                          )}

                          Delete
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

      {/* =====================================================
          ANNOUNCEMENT ADD / EDIT MODAL
      ====================================================== */}

      {isFormOpen && (
        <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="min-h-full flex items-center justify-center py-6">
            <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-slate-950 shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 sm:px-6 py-5">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                    {editingId ? (
                      <Edit3
                        size={21}
                        className="text-emerald-400"
                      />
                    ) : (
                      <Plus
                        size={21}
                        className="text-emerald-400"
                      />
                    )}
                  </div>

                  <div className="min-w-0">
                    <h2 className="font-black text-lg truncate">
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
                  onClick={closeForm}
                  disabled={saving}
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition disabled:opacity-50"
                >
                  <X size={19} />
                </button>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSave}
                className="p-5 sm:p-6 space-y-5"
              >
                {/* Title */}
                <div>
                  <label
                    htmlFor="announcement-title"
                    className="block text-sm font-semibold text-slate-300 mb-2"
                  >
                    Title
                  </label>

                  <input
                    id="announcement-title"
                    type="text"
                    value={form.title}
                    onChange={(event) =>
                      handleChange(
                        "title",
                        event.target.value
                      )
                    }
                    placeholder="Announcement title"
                    required
                    disabled={saving}
                    className="w-full h-12 rounded-2xl border border-white/10 bg-black/20 px-4 text-white placeholder:text-slate-600 outline-none focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/10 disabled:opacity-50"
                  />
                </div>

                {/* Description */}
                <div>
                  <label
                    htmlFor="announcement-description"
                    className="block text-sm font-semibold text-slate-300 mb-2"
                  >
                    Description
                  </label>

                  <textarea
                    id="announcement-description"
                    value={form.description}
                    onChange={(event) =>
                      handleChange(
                        "description",
                        event.target.value
                      )
                    }
                    placeholder="Short description"
                    rows={4}
                    disabled={saving}
                    className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-slate-600 outline-none resize-none focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/10 disabled:opacity-50"
                  />
                </div>

                {/* Image URL */}
                <div>
                  <label
                    htmlFor="announcement-image"
                    className="block text-sm font-semibold text-slate-300 mb-2"
                  >
                    Image URL
                  </label>

                  <div className="relative">
                    <ImageIcon
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                    />

                    <input
                      id="announcement-image"
                      type="url"
                      value={form.imageUrl}
                      onChange={(event) =>
                        handleChange(
                          "imageUrl",
                          event.target.value
                        )
                      }
                      placeholder="https://..."
                      required
                      disabled={saving}
                      className="w-full h-12 rounded-2xl border border-white/10 bg-black/20 pl-11 pr-4 text-white placeholder:text-slate-600 outline-none focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/10 disabled:opacity-50"
                    />
                  </div>

                  {/* Preview */}
                  {form.imageUrl && (
                    <div className="mt-3 h-40 rounded-2xl overflow-hidden border border-white/10 bg-white/5">
                      <img
                        src={form.imageUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(event) => {
                          event.currentTarget.style.display =
                            "none";
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Link */}
                <div>
                  <label
                    htmlFor="announcement-link"
                    className="block text-sm font-semibold text-slate-300 mb-2"
                  >
                    Link URL

                    <span className="ml-2 text-xs font-normal text-slate-600">
                      Optional
                    </span>
                  </label>

                  <div className="relative">
                    <ExternalLink
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                    />

                    <input
                      id="announcement-link"
                      type="url"
                      value={form.linkUrl}
                      onChange={(event) =>
                        handleChange(
                          "linkUrl",
                          event.target.value
                        )
                      }
                      placeholder="https://..."
                      disabled={saving}
                      className="w-full h-12 rounded-2xl border border-white/10 bg-black/20 pl-11 pr-4 text-white placeholder:text-slate-600 outline-none focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/10 disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <div className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                    {error}
                  </div>
                )}

                {/* Buttons */}
                <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={closeForm}
                    disabled={saving}
                    className="w-full sm:w-auto rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold hover:bg-white/10 transition disabled:opacity-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-6 py-3 text-sm font-black text-slate-950 hover:bg-emerald-400 transition disabled:opacity-60"
                  >
                    {saving ? (
                      <>
                        <Loader2
                          size={18}
                          className="animate-spin"
                        />

                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={18} />

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
          COMMENT EDIT MODAL
      ====================================================== */}

      {isCommentFormOpen && (
        <div className="fixed inset-0 z-[110] bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="min-h-full flex items-center justify-center py-6">
            <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-slate-950 shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 sm:px-6 py-5">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-2xl bg-sky-500/10 flex items-center justify-center shrink-0">
                    <Edit3
                      size={21}
                      className="text-sky-400"
                    />
                  </div>

                  <div className="min-w-0">
                    <h2 className="font-black text-lg">
                      Edit Comment
                    </h2>

                    <p className="text-xs text-slate-500">
                      Update the live comment.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={closeCommentForm}
                  disabled={savingComment}
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition disabled:opacity-50"
                >
                  <X size={19} />
                </button>
              </div>

              {/* Form */}
              <form
                onSubmit={handleCommentSave}
                className="p-5 sm:p-6 space-y-5"
              >
                {/* Name */}
                <div>
                  <label
                    htmlFor="comment-name"
                    className="block text-sm font-semibold text-slate-300 mb-2"
                  >
                    Name
                  </label>

                  <input
                    id="comment-name"
                    type="text"
                    value={commentForm.name}
                    onChange={(event) =>
                      handleCommentChange(
                        "name",
                        event.target.value
                      )
                    }
                    placeholder="Name"
                    required
                    disabled={savingComment}
                    className="w-full h-12 rounded-2xl border border-white/10 bg-black/20 px-4 text-white placeholder:text-slate-600 outline-none focus:border-sky-400/60 focus:ring-2 focus:ring-sky-400/10 disabled:opacity-50"
                  />
                </div>

                {/* Comment */}
                <div>
                  <label
                    htmlFor="comment-text"
                    className="block text-sm font-semibold text-slate-300 mb-2"
                  >
                    Comment
                  </label>

                  <textarea
                    id="comment-text"
                    value={commentForm.comment}
                    onChange={(event) =>
                      handleCommentChange(
                        "comment",
                        event.target.value
                      )
                    }
                    placeholder="Comment"
                    rows={6}
                    required
                    disabled={savingComment}
                    className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-slate-600 outline-none resize-none focus:border-sky-400/60 focus:ring-2 focus:ring-sky-400/10 disabled:opacity-50"
                  />
                </div>

                {/* Error */}
                {error && (
                  <div className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                    {error}
                  </div>
                )}

                {/* Buttons */}
                <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={closeCommentForm}
                    disabled={savingComment}
                    className="w-full sm:w-auto rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold hover:bg-white/10 transition disabled:opacity-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={savingComment}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-500 px-6 py-3 text-sm font-black text-slate-950 hover:bg-sky-400 transition disabled:opacity-60"
                  >
                    {savingComment ? (
                      <>
                        <Loader2
                          size={18}
                          className="animate-spin"
                        />

                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={18} />

                        Save Changes
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
